const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Contract = db.contract;
const ContractExtraService = db.contractExtraService;


const validatorCreateContractExtraService= [

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
            return Promise.reject({message:"Some error occurred when adding Contract extra service, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This Contract does not exist"});
        }
    }).bail(),

    body("serviceName")

    .trim()
    .exists().withMessage({message:"contract extra service Name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract extra service Name"}).bail()
    .isString().withMessage({message:"contract extra service Name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"contract extra service Name must contain at least one character"}).bail(),


    body("isApproved")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({ message: "Approved had not been declared" }).bail()
    .notEmpty().withMessage({ message: "Approved must have a value" }).bail()
    .isBoolean().withMessage({ message: "Approved must be boolean" }).bail(),
    




   async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(200)
            res.send({error : err.array() });
            
        }
    }
];
const validatorgetAndDeleteContractExtraService = [
    param("id")
    .trim()
    .exists().withMessage({message:"Contract extra service identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Contract extra service identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await ContractExtraService.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing contract extra service, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"contract extra service does not exist"});
        }
    }).bail(),
    async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(200)
            res.send({error : err.array()});
        }
    }

];

const validatorgetContractExtraServicesInContract= [
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
            res.status(200)
            res.send({error : err.array()});
        }
    }

];

const validatorupdateContractExtraService = [

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
            return Promise.reject({message:"Some error occurred when adding Contract extra service, Please try refreshing your page."});
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

    body("isApproved")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({ message: "Approved had not been declared" }).bail()
    .notEmpty().withMessage({ message: "Approved must have a value" }).bail()
    .isBoolean().withMessage({ message: "Approved must be boolean" }).bail(),


    async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(200)
            res.send({error : err.array()});
        }
    }
];

const validatorDeleteManyExtraServices = [
    body("ids")
      .exists().withMessage({message: "Extra Service identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "Extra Service identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "Extra Service  id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await ContractExtraService.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting Extra Service , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some Extra Service do not exist" });
          }
        })
        .bail(),
  
    async (req, res, next) => {
      try {
        validationResult(req).throw();
        return next();
      } catch (err) {
        res.status(200);
        res.send({ error: err.array() });
      }
    },
  ];

module.exports = {validatorCreateContractExtraService ,validatorDeleteManyExtraServices, validatorgetAndDeleteContractExtraService , validatorgetContractExtraServicesInContract, validatorupdateContractExtraService}