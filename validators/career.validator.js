const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Career = db.career;
const Op = db.Sequelize.Op;

const validatorCreateCareer = [
    body("position")
    .exists()
    .withMessage({message: "position field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for position" }).bail()
    .isString().withMessage({ message: "position field must be a String" }).bail(),

    body("description")
    .optional()
    .trim()
    .exists().withMessage({message:"Career description field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Career description"}).bail()
    .isString().withMessage({message:"Career description field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Career description must contain at least one character"}).bail(),

    
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
const validatorgetAndDeleteCareer = [
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
            return Promise.reject({message:"Some error occurred while bringing Career, Please try refreshing your page."});
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
const validatorupdateCareer = [

    body("description")
    .optional()
    .trim()
    .exists().withMessage({message:"Career description field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Career description"}).bail()
    .isString().withMessage({message:"Career description field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Career description must contain at least one character"}).bail(),

    body("position")
    .optional()
    .exists()
    .withMessage({message: "position field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for position" }).bail()
    .isString().withMessage({ message: "position field must be a String" }).bail()
    .custom(async (value, { req }) => {
        const position = req.body.position;
        const response = await Career.findAll({
            where:{
                position : position
            }
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while updating career, Please try refreshing your page."});
          });
        if (response.length > 0){
            if (response[0].dataValues.id != req.params.id){
                return Promise.reject({message:`${position} is already used`});
            }
        }
    })
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
const validatorDeleteManyCareers = [
    body("ids")
      .exists().withMessage({message: "careers identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "careers identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "career id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await Career.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting careers , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some careers do not exist" });
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
module.exports = {validatorCreateCareer ,validatorDeleteManyCareers, validatorgetAndDeleteCareer , validatorupdateCareer}