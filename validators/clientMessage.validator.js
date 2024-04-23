const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const ClientMessage = db.clientMessage;
const Client = db.client;


const validatorCreateClientMessage = [

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
            return Promise.reject({message:"Some error occurred when adding Message, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This Client does not exist"});
        }
    }).bail(),


    body("message")
    .trim()
    .exists().withMessage({message:"client message field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for client message"}).bail()
    .isString().withMessage({message:"client message field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"client message must contain at least one character"}).bail(),


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
const validatorgetAndDeleteClientMessage = [
    param("id")
    .trim()
    .exists().withMessage({message:"Client Message  identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Client Message identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await ClientMessage.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing Client Message , Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"Client Message does not exist"});
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

const validatorgetClientMessageInClient= [
    param("id")
    .trim()
    .exists().withMessage({message:"Client Message identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Client Message identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Client.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing client messages, Please try refreshing your page."});
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

const validatorupdateClientMessage = [

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
            return Promise.reject({message:"Some error occurred when updating Client Message, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This Client does not exist"});
        }
    }).bail(),


    body("message")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"client message field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for contract drive link"}).bail()
    .isString().withMessage({message:"client message field must be a String"}).bail()
    .isLength({min:2}).withMessage({message:"client message must contain at least two character"}).bail(),

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


const validatorDeleteManyMessages = [
    body("ids")
      .exists().withMessage({message: "advertisement identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "advertisement identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "advertisement ID must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await ClientMessage.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting advertisement , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some advertisement do not exist" });
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
module.exports = {validatorCreateClientMessage ,validatorDeleteManyMessages, validatorgetAndDeleteClientMessage , validatorgetClientMessageInClient, validatorupdateClientMessage}