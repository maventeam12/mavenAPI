const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

const validatorRegister = [
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
            return Promise.reject({message:"Some error occurred while creating Client, Please try refreshing your page."});
          });
        if (response.length > 0){
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
            res.status(403)
            res.send({error : err.array() });
        }
    }
];
const validatorLogin = [

    body("password")
    .trim()
    .exists().withMessage({message: "password field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for password"}).bail()
    .isString().withMessage({message: "password field must be a String"}).bail()
    .isLength({ min: 1 }).withMessage({message: "password must contain at least one character"}).bail(),

    body("login")
    .trim()
    .exists().withMessage({message: "username/email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for username/email"}).bail()
    .isString().withMessage({message: "username/email field must be a String"}).bail()
    .isLength({ min: 1 }).withMessage({message: "username/email must contain at least one character"}).bail(),
    



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
module.exports = {validatorRegister , validatorLogin}