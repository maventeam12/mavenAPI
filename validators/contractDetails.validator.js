const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Contract = db.contract;
const ContractDetail = db.contractDetail;


const validatorCreateContractDetail= [

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
            return Promise.reject({message:"Some error occurred when adding Contract Detail, Please try refreshing your page."});
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
    .exists().withMessage({message: "Contract Detail quantity had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail quantity must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract Detail quantity must be a positive number"}).bail(),

    body("delivered")
    .trim()
    .exists().withMessage({message: "Contract Detail delivered had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail delivered must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract Detail delivered must be a positive number"}).bail(),
    
    body("extra")
    .trim()
    .exists().withMessage({message: "Contract Detail extra had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail extra must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract Detail extra must be a positive number"}).bail(),

    body("month")
    .trim()
    .exists().withMessage({message: "Contract Detail month had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail month must have a value"}).bail()
    .isInt({ min: 1 , max:12 }).withMessage({message: "Contract Detail month error"}).bail(),



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
const validatorgetAndDeleteContractDetail = [
    param("id")
    .trim()
    .exists().withMessage({message:"Contract detail identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Contract detail identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await ContractDetail.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing contract detail, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"contract detail does not exist"});
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

const validatorgetContractDetailsInContract= [
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

const validatorupdateContractDetail = [

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
            return Promise.reject({message:"Some error occurred when adding Contract Detail, Please try refreshing your page."});
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
    .exists().withMessage({message: "Contract Detail quantity had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail quantity must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract Detail quantity must be a positive number"}).bail(),

    body("delivered")
    .optional()
    .trim()
    .exists().withMessage({message: "Contract Detail delivered had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail delivered must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract Detail delivered must be a positive number"}).bail(),
    
    body("extra")
    .optional()
    .trim()
    .exists().withMessage({message: "Contract Detail extra had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail extra must have a value"}).bail()
    .isInt({ min: 0 }).withMessage({message: "Contract Detail extra must be a positive number"}).bail(),

    body("month")
    .optional()
    .trim()
    .exists().withMessage({message: "Contract Detail month had not been declared"}).bail()
    .notEmpty().withMessage({ message: "Contract Detail month must have a value"}).bail()
    .isInt({ min: 1 , max:12 }).withMessage({message: "Contract Detail month error"}).bail(),


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



module.exports = {validatorCreateContractDetail , validatorgetAndDeleteContractDetail , validatorgetContractDetailsInContract, validatorupdateContractDetail}