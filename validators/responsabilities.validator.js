const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Responsability = db.responsability;
const Career = db.career;

const validatorCreateResponsability = [

    body("description")
    .exists().withMessage({message: "description field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for description" }).bail()
    .isString().withMessage({ message: "description field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"respnsibility description must contain at least two character"}).bail(),

    body("careerId")
    .trim()
    .exists().withMessage({message:"career identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"career identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Career.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred when adding responsibilty, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This carrer does not exist"});
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
const validatorgetAndDeleteResponsability = [
    param("id")
    .trim()
    .exists().withMessage({message:"Responsability identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Responsability identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Responsability.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing Responsability, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"Responsability does not exist"});
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
const validatorupdateResponsability = [

    body("description")
    .exists()
    .withMessage({message: "description field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for description" }).bail()
    .isString().withMessage({ message: "description field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"respnsibility description must contain at least two character"}).bail(),
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
const validatorgetResponsabilitiesInCareer= [
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
            return Promise.reject({message:"Some error occurred while bringing Career responsabilities, Please try refreshing your page."});
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
            res.status(403)
            res.send({error : err.array()});
        }
    }

];
module.exports = {validatorCreateResponsability , validatorgetAndDeleteResponsability , validatorupdateResponsability, validatorgetResponsabilitiesInCareer}