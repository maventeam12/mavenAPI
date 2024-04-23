const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Contract = db.contract;
const ContractService = db.contractService;


const validatorCreateContractService= [

    body("contractId")
    .trim()
    .exists().withMessage({message:"Contract identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Contract identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Contract.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred when adding Contract service, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This Contract does not exist"});
        }
    }).bail(),

    body("serviceName")

    .trim()
    .exists().withMessage({message:"contract service Name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract service Name"}).bail()
    .isString().withMessage({message:"contract service Name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"contract service Name must contain at least one character"}).bail(),

    body("quantity")
    .trim()
    .exists().withMessage({message: "Contract service quantity had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract service quantity must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract service quantity must be a positive number"}).bail(),

    body("isActive")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({ message: "Active had not been declared" }).bail()
    .notEmpty().withMessage({ message: "Active must have a value" }).bail()
    .isBoolean().withMessage({ message: "Active must be boolean" }).bail(),
    




   async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(403)
            res.send({error : err.array() });
            
        }
    }
];
const validatorgetAndDeleteContractService = [
    param("id")
    .trim()
    .exists().withMessage({message:"Contract service identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Contract service identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await ContractService.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing contract service, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"contract service does not exist"});
        }
    }).bail(),
    async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(403)
            res.send({error : err.array()});
        }
    }

];

const validatorgetContractServicesInContract= [
    param("id")
    .trim()
    .exists().withMessage({message:"Contract identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Contract identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Contract.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing contract, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"contract does not exist"});
        }
    }).bail(),
    async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(403)
            res.send({error : err.array()});
        }
    }

];

const validatorupdateContractService = [

    body("contractId")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Contract identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Contract identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Contract.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred when adding Contract service, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This Contract does not exist"});
        }
    }).bail(),

    body("serviceName")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract service Name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract service Name"}).bail()
    .isString().withMessage({message:"contract service Name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"contract service Name must contain at least one character"}).bail(),

    body("quantity")
    .optional()
    .trim()
    .exists().withMessage({message: "Contract service quantity had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract service quantity must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract service quantity must be a positive number"}).bail(),

    body("isActive")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({ message: "Active had not been declared" }).bail()
    .notEmpty().withMessage({ message: "Active must have a value" }).bail()
    .isBoolean().withMessage({ message: "Active must be boolean" }).bail(),


    async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(403)
            res.send({error : err.array()});
        }
    }
];



module.exports = {validatorCreateContractService , validatorgetAndDeleteContractService , validatorgetContractServicesInContract, validatorupdateContractService}