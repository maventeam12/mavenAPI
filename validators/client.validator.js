const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Client = db.client;
const CompanyUser = db.companyUser;
const Op = db.Sequelize.Op;
const fs = require("fs");
const validatorCreateClient = [
    body("name")
    .trim()
    .exists().withMessage({message:"Client name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Client name"}).bail()
    .isString().withMessage({message:"Client name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Client name must contain at least one character"}).bail(),

    body("phone")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Client phone name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Client phone name"}).bail()
    .isString().withMessage({message:"Client phone name field must be a String"}).bail()
    .isLength({ min: 10, max: 10 }).withMessage({message:"Client phone name must be 10 numbers"}).bail()
    .isMobilePhone().withMessage({message:"Client phone name field must be a phone number"}).bail(),

    body("email")
    .trim()
    .exists()
    .withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail()
    .custom(async (value, { req }) => {
        const response = await Client.findAll({
            where:{
                email : value
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (response.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
        const responseCompany = await CompanyUser.findAll({
            where:{
                email : value
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
        if (responseCompany.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),

    body("address")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Client message field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Client message"}).bail()
    .isString().withMessage({message:"Client message field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Client message must contain at least one character"}).bail(),


    body("password")
    .trim()
    .exists().withMessage({message: "password field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for password"}).bail()
    .isStrongPassword().withMessage({  message:"password must contain capital , small letters , a number and a sign"}).bail(),

    body("username")
    .trim()
    .exists().withMessage({ message: " username field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for  username"}).bail()
    .isString().withMessage({ message: " username field must be a String" }).bail()
    .isLength({ min: 2 }).withMessage({message: " username must contain at least two character" }).bail()
    .custom(async (value, { req }) => {
        const response = await Client.findAll({
            where:{
                username : value
            }
        }).catch(err => {
             (err);
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (response.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
        const responseCompany = await CompanyUser.findAll({
            where:{
                username : value
            }
        }).catch(err => {
             (err);
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
        if (responseCompany.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),

    body("isImportant")
    .optional({nullable:true,checkFalsy: true})
    .exists()
    .withMessage({ message: "is important had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "is important must have a value" })
    .bail()
    .isBoolean()
    .withMessage({ message: "is important must be boolean" })
    .bail(),


   async (req ,res , next) =>{
        try{
           
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(200)
            res.send({error : err.array() });
            if(req?.file?.path){
                fs.unlinkSync(req.file.path);
              }
        }
    }
];
const validatorgetAndDeleteClient = [
    param("id")
    .trim()
    .exists().withMessage({message:"Client  identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Client  identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Client .findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing Client , Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"Client  does not exist"});
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
const validatorupdateClient = [

    body("name")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Client name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Client name"}).bail()
    .isString().withMessage({message:"Client name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Client name must contain at least one character"}).bail(),

    body("phone")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Client phone name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Client phone name"}).bail()
    .isString().withMessage({message:"Client phone name field must be a String"}).bail()
    .isLength({ min: 10, max: 10 }).withMessage({message:"Client phone name must be 10 numbers"}).bail()
    .isMobilePhone().withMessage({message:"Client phone name field must be a phone number"}).bail(),

    body("email")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists()
    .withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail()
    .custom(async (value, { req }) => {
        const response = await Client.findAll({
            where:{
                email : value
            }
        }).catch(err => {
             (err);
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
          if (response.length > 0 ){
            if (response[0].dataValues.id != req.params.id){

                return Promise.reject({message:`${value} is already used`});
            }
        }
        const responseCompany = await CompanyUser.findAll({
            where:{
                email : value
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
        if (responseCompany.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),

    body("address")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Client message field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Client message"}).bail()
    .isString().withMessage({message:"Client message field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Client message must contain at least one character"}).bail(),


    body("password")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message: "password field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for password"}).bail()
    .isStrongPassword().withMessage({  message:"password must contain capital , small letters , a number and a sign"}).bail(),

    body("username")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({ message: " username field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for  username"}).bail()
    .isString().withMessage({ message: " username field must be a String" }).bail()
    .isLength({ min: 1 }).withMessage({message: " username must contain at least one character" }).bail()
    .custom(async (value, { req }) => {
        const response = await Client.findAll({
            where:{
                username : value
            }
        }).catch(err => {
             (err);
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (response.length > 0 ){
            if (response[0].dataValues.id != req.params.id){

                return Promise.reject({message:`${value} is already used`});
            }
        }
        const responseCompany = await CompanyUser.findAll({
            where:{
                username : value
            }
        }).catch(err => {
             (err);
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
        if (responseCompany.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),

    body("isImportant")
    .optional({nullable:true,checkFalsy: true})
    .exists()
    .withMessage({ message: "is important had not been declared"})
    .bail()
    .notEmpty()
    .withMessage({ message: "is important must have a value"})
    .bail()
    .isBoolean()
    .withMessage({ message: "is important must be boolean" })
    .bail(),
   async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(200)
            res.send({error : err.array() });
            if(req?.file?.path){
                fs.unlinkSync(req.file.path);
              }
        }
    }

];
const validatorDeleteManyClients = [
    body("ids")
      .exists().withMessage({message: "clients identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "clients identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "client id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await Client.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting Clients , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some Clients do not exist" });
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
module.exports = {validatorCreateClient ,validatorDeleteManyClients, validatorgetAndDeleteClient , validatorupdateClient}