const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Event = db.event;
const fs = require('fs');


const validatorCreateEvent= [

    body("name")
    .trim()
    .exists().withMessage({message:"Event name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for Event name"}).bail()
    .isString().withMessage({message:"Event name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"Event name must contain at least one character"}).bail(),

    body("description")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({message: "description field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for description" }).bail()
    .isString().withMessage({ message: "description field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"events description must contain at least two character"}).bail(),

   async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            fs.unlinkSync(req.file.path);
            res.status(403)
            res.send({error : err.array() });
            if(req?.file?.path){
              fs.unlinkSync(req.file.path);
            }
            
        }
    }
];
const validatorgetAndDeleteEvent = [
    param("id")
    .trim()
    .exists().withMessage({message:"event identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"event identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Event.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing event , Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"event does not exist"});
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
const validatorupdateEvent = [

    body("name")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"event name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for event name"}).bail()
    .isString().withMessage({message:"event name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"event name must contain at least one character"}).bail(),

    body("description")
    .optional({nullable:true,checkFalsy: true})
    .exists().withMessage({message: "description field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for description" }).bail()
    .isString().withMessage({ message: "description field must be a String" }).bail()
    .isLength({min:2}).withMessage({message:"event description must contain at least two character"}).bail(),



   async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            res.status(403)
            res.send({error : err.array() });
            if(req?.file?.path){
              fs.unlinkSync(req.file.path);
            }
        }
    }

];
const validatorDeleteManyEvents = [
    body("ids")
      .exists().withMessage({message: "events identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "events identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "event id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await Event.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting Events , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some Events do not exist" });
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
module.exports = {validatorCreateEvent , validatorgetAndDeleteEvent , validatorupdateEvent,validatorDeleteManyEvents}