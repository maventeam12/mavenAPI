const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Skill = db.skill;
const Career = db.career;

const validatorCreateSkill= [

    body("description")
    .exists().withMessage({message: "description field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for description" }).bail()
    .isString().withMessage({ message: "description field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"Skill description must contain at least two character"}).bail(),

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
            return Promise.reject({message:"Some error occurred when adding skill, Please try refreshing your page."});
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
             (err);
            res.status(403)
            res.send({error : err.array() });
        }
    }
];
const validatorgetAndDeleteSkill = [
    param("id")
    .trim()
    .exists().withMessage({message:"skill identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"skill identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Skill.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing skill, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"skill does not exist"});
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
const validatorupdateSkill = [

    body("description")
    .exists()
    .withMessage({message: "description field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for description" }).bail()
    .isString().withMessage({ message: "description field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"skill description must contain at least two character"}).bail(),
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
const validatorgetSkillsInCareer= [
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
            return Promise.reject({message:"Some error occurred while bringing Career skills, Please try refreshing your page."});
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
module.exports = {validatorCreateSkill , validatorgetAndDeleteSkill , validatorupdateSkill, validatorgetSkillsInCareer}