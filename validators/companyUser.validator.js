const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const CompanyUser = db.companyUser;
const Client = db.client;

const validatorCreateCompanyUser = [
    body("name")
    .trim()
    .exists().withMessage({message:"Company User name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Company User name"}).bail()
    .isString().withMessage({message:"Company User name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Company User name must contain at least one character"}).bail(),

    body("phone")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Company User phone name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Company User phone name"}).bail()
    .isString().withMessage({message:"Company User phone name field must be a String"}).bail()
    .isLength({ min: 10, max: 10 }).withMessage({message:"Company User phone name must be 10 numbers"}).bail()
    .isMobilePhone().withMessage({message:"Company User phone name field must be a phone number"}).bail(),

    body("email")
    .trim()
    .exists()
    .withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail()
    .custom(async (value, { req }) => {
        const response = await CompanyUser.findAll({
            where:{
                email : value
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
        if (response.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
        const responseClient = await Client.findAll({
            where:{
                email : value
            }
        }).catch(err => {
            console.log(err);
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (responseClient.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),


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
        const response = await CompanyUser.findAll({
            where:{
                username : value
            }
        }).catch(err => {
            console.log(err);
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
        if (response.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
        const responseClient = await Client.findAll({
            where:{
                username : value
            }
        }).catch(err => {
            console.log(err);
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (responseClient.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),

    body("isAdmin")
    .optional({nullable:true,checkFalsy: true})
    .exists()
    .withMessage({ message: "is admin had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "is admin must have a value" })
    .bail()
    .isBoolean()
    .withMessage({ message: "is admin must be boolean" })
    .bail(),


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
const validatorgetAndDeleteCompanyUser = [
    param("id")
    .trim()
    .exists().withMessage({message:"Company User  identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Company User  identifier must have a value"}).bail()
    .custom(async (value , {req}) => {
console.log("value",value);
        const response = await CompanyUser .findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing Company User , Please try refreshing your page."});
          });
          console.log(response);
        if (response.length == 0){
            return Promise.reject({message:"Company User does not exist"});
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
const validatorupdateCompanyUser = [

    body("name")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Company User name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Company User name"}).bail()
    .isString().withMessage({message:"Company User name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Company User name must contain at least one character"}).bail(),

    body("phone")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"Company User phone name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Company User phone name"}).bail()
    .isString().withMessage({message:"Company User phone name field must be a String"}).bail()
    .isLength({ min: 10, max: 10 }).withMessage({message:"Company User phone name must be 10 numbers"}).bail()
    .isMobilePhone().withMessage({message:"Company User phone name field must be a phone number"}).bail(),

    body("email")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists()
    .withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail()
    .custom(async (value, { req }) => {
        const response = await CompanyUser.findAll({
            where:{
                email : value
            }
        }).catch(err => {
            console.log(err);
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
          if (response.length > 0 ){
            if (response[0].dataValues.id != req.params.id){

                return Promise.reject({message:`${value} is already used`});
            }
        }
        const responseClient = await Client.findAll({
            where:{
                email : value
            }
        }).catch(err => {
            console.log(err);
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (responseClient.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),

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
        const response = await CompanyUser.findAll({
            where:{
                username : value
            }
        }).catch(err => {
            console.log(err);
            return Promise.reject({message:"Some error occurred while creating Company User, Please try refreshing your page."});
          });
        if (response.length > 0 ){
            if (response[0].dataValues.id != req.params.id){

                return Promise.reject({message:`${value} is already used`});
            }
        }
        const responseClient = await Client.findAll({
            where:{
                username : value
            }
        }).catch(err => {
            console.log(err);
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (responseClient.length > 0){
            return Promise.reject({message:`${value} is already used`});
        }
    })
    .bail(),

    body("isAdmin")
    .optional({nullable:true,checkFalsy: true})
    .exists()
    .withMessage({ message: "is admin had not been declared"})
    .bail()
    .notEmpty()
    .withMessage({ message: "is admin must have a value"})
    .bail()
    .isBoolean()
    .withMessage({ message: "is admin must be boolean" })
    .bail(),
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
const validatorDeleteManyUsers = [
    body("ids")
      .exists().withMessage({message: "Appointments identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "Appointments identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "Appointment id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await CompanyUser.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting users , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some users do not exist" });
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
module.exports = {validatorCreateCompanyUser ,validatorDeleteManyUsers, validatorgetAndDeleteCompanyUser , validatorupdateCompanyUser}