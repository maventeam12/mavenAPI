const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Service = db.service;
const Op = db.Sequelize.Op;

const validatorCreateService = [
    body("name")
    .trim()
    .exists().withMessage({message:"service name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for service name"}).bail()
    .isString().withMessage({message:"service name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"service name must contain at least one character"}).bail()
    .custom(async (value,{req}) => {
        const name = req.body.name;
        const response = await Service.findAll({
            where:{
                name : name
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating service, Please try refreshing your page."});
          });
        if (response.length > 0){
            return Promise.reject({message:`${name} is already used`});
        }
      
        }).bail()
        ,
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
const validatorgetAndDeleteService = [
    param("id")
    .trim()
    .exists().withMessage({message:"service identifier had not been declared", errorCode:53}).bail()
    .notEmpty().withMessage({message:"service identifier must have a value", errorCode:54}).bail()
    .custom(async (value , {req}) => {

        const response = await Service.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing service, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"service does not exist"});
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
const validatorupdateService = [

    body("name")
    .trim()
    .exists().withMessage({message:"service name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for service name"}).bail()
    .isString().withMessage({message:"service name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"service name must contain at least one character"}).bail()
    .custom(async (value,{req}) => {
        const name = req.body.name;
        const response = await Service.findAll({
            where:{
                name : name
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while creating service, Please try refreshing your page."});
          });
        if (response.length > 0 ){
            if (response[0].dataValues.id != req.params.id){

                return Promise.reject({message:`${name} is already used`});
            }
        }
        }).bail(),
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


const validatorDeleteManyServices = [
    body("ids")
      .exists().withMessage({message: "services identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "services identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "services identifier  must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await Service.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting services , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some services do not exist" });
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

module.exports = {validatorCreateService , validatorgetAndDeleteService , validatorupdateService,validatorDeleteManyServices}