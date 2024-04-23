const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const UserCareer = db.userCareer;
const Career = db.career;
const fs = require('fs');


const validatorCreateUserCareer= [

    body("name")
    .trim()
    .exists().withMessage({message:"career solicitud name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for career solicitud name"}).bail()
    .isString().withMessage({message:"career solicitud name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"career solicitud name must contain at least one character"}).bail(),

    body("message")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({message: "message field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for message" }).bail()
    .isString().withMessage({ message: "message field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"career solicitud message must contain at least two character"}).bail(),

    body("email")
    .trim()
    .exists().withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail()
    .custom(async (value, { req }) => {
        const email = req.body.email;
        const response = await UserCareer.findAll({
            where:{
                email : email,
                career : req.body.career
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating career solicitud, Please try refreshing your page."});
          });
        if (response.length > 0){
            return Promise.reject({message:`${email} is already submitted `});
        }
    })
    .bail(),

    body("career")
    .trim()
    .exists().withMessage({message:"career solicitud field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for career solicitud"}).bail()
    .isString().withMessage({message:"career solicitud field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"career solicitud must contain at least one character"}).bail(),

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
const validatorgetAndDeleteUserCareer = [
    param("id")
    .trim()
    .exists().withMessage({message:"career user identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"career user identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await UserCareer.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing career user, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"career user does not exist"});
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
const validatorupdateUserCareer = [

    body("name")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"career solicitud name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for career solicitud name"}).bail()
    .isString().withMessage({message:"career solicitud name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"career solicitud name must contain at least one character"}).bail(),

    body("message")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({message: "message field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for message" }).bail()
    .isString().withMessage({ message: "message field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"career solicitud message must contain at least two character"}).bail(),

    body("email")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail()
    .custom(async (value, { req }) => {
        const email = req.body.email;
        const response = await UserCareer.findAll({
            where:{
                email : email
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating career solicitud, Please try refreshing your page."});
          });
          if (response.length > 0 ){
            if (response[0].dataValues.id != req.params.id){
    
                return Promise.reject({message:`${value} is already used`});
            }
        }
    })
    .bail(),

 
    body("career")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"career solicitud field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for career solicitud"}).bail()
    .isString().withMessage({message:"career solicitud field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"career solicitud must contain at least one character"}).bail(),



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
const validatorgetUserInCareer= [
    param("id")
    .trim()
    .exists().withMessage({message:"Career identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Career identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Career.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing Career user, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"Career does not exist"});
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
const validatorDeleteManySolicitudes = [
    body("ids")
      .exists().withMessage({message: "career solicitud identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "career solicitud identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "career solicitud  id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await UserCareer.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting career solicitud , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some career solicitud do not exist" });
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
module.exports = {validatorCreateUserCareer ,validatorDeleteManySolicitudes, validatorgetAndDeleteUserCareer , validatorupdateUserCareer, validatorgetUserInCareer}