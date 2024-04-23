const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Contract = db.contract;
const Client = db.client;


const validatorCreateContract= [

    body("clientId")
    .trim()
    .exists().withMessage({message:"Client identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Client identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Client.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred when adding Contract, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This Client  does not exist"});
        }
    }).bail(),

    body("startDate")
    .trim()
    .exists().withMessage({message:"contract start date field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract start date"}).bail()
    .isISO8601().toDate().withMessage({message:"contract start date must be date format"}).bail(),

    body("endDate")
    .trim()
    .exists().withMessage({message:"contract end date field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract end date"}).bail()
    .isISO8601().toDate().withMessage({message:"contract end date must be date format"}).bail(),

    body("linkToDrive")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract drive link field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract drive link"}).bail()
    .isString().withMessage({message:"contract drive link field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"contract drive link must contain at least one character"}).bail(),

    body("title")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract title field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract title"}).bail()
    .isString().withMessage({message:"contract title field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"contract title must contain at least one character"}).bail(),

    body("months")
    .trim()
    .exists().withMessage({message:"contract months field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract months"}).bail(),


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
const validatorgetAndDeleteContract = [
    param("id")
    .trim()
    .exists().withMessage({message:"Contract  identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Contract identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Contract.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing contract , Please try refreshing your page."});
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

const validatorgetContractsInClient= [
    param("id")
    .trim()
    .exists().withMessage({message:"client identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"client identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Client.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing client contracts, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"client does not exist"});
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

const validatorupdateContract = [

    body("clientId")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Client identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Client identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Client.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred when updating Contract, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This Client does not exist"});
        }
    }).bail(),

    body("startDate")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract start date field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract start date"}).bail()
    .isISO8601().toDate().withMessage({message:"contract start date must be date format"}).bail(),

    body("endDate")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract end date field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract end date"}).bail()
    .isISO8601().toDate().withMessage({message:"contract end date must be date format"}).bail(),

    body("linkToDrive")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract drive link field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract drive link"}).bail()
    .isString().withMessage({message:"contract drive link field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"contract drive link must contain at least one character"}).bail(),

    body("title")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract title field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract title"}).bail()
    .isString().withMessage({message:"contract title field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"contract title must contain at least one character"}).bail(),

    body("months")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"contract months field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract months"}).bail(),


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



module.exports = {validatorCreateContract , validatorgetAndDeleteContract , validatorgetContractsInClient, validatorupdateContract}