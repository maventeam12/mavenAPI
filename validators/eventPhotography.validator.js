const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const EventPhotography = db.eventPhotography;
const Event = db.event;
const fs = require('fs');
const validatorCreateEventPhotography= [

    body("eventId")
    .trim()
    .exists().withMessage({message:"event identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"event identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Event.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred when adding photography, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This event ID does not exist"});
        }
    }).bail(),
   async (req ,res , next) =>{
        try{
            validationResult(req).throw()
            return next()
        }catch(err){
            fs.unlinkSync(req.file.path);
            res.status(200)
            res.send({error : err.array() });
            if(req?.file?.path){
              fs.unlinkSync(req.file.path);
            }
            
        }
    }
];
const validatorupdateEventPhotography = [
    body("eventId")
    .optional()
    .trim()
    .exists().withMessage({message:"event identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"event identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Event.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred when adding photography, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"This event does not exist"});
        }
    }).bail(),
  
    async (req, res, next) => {
      try {
        validationResult(req).throw();
        return next();
      } catch (err) {
        res.status(200);
        res.send({ error: err.array() });
        if(req?.file?.path){
          fs.unlinkSync(req.file.path);
        }
      }
    },
  ];
const validatorgetAndDeleteEventPhotography = [
    param("id")
    .trim()
    .exists().withMessage({message:"event photography identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"event photography identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await EventPhotography.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing event photography, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"Event Photography does not exist"});
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

const validatorgetPhotographiesInEvent= [
    param("id")
    .trim()
    .exists().withMessage({message:"Event identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"Event identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Event.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing event photographies, Please try refreshing your page."});
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
            res.status(200)
            res.send({error : err.array()});
        }
    }

];
const validatorDeleteManyEventsPhotographies = [
    body("ids")
      .exists().withMessage({message: "photographies identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "photographies identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "customer id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await EventPhotography.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting photographies , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some photographies do not exist" });
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
module.exports = {validatorCreateEventPhotography ,validatorupdateEventPhotography, validatorgetAndDeleteEventPhotography , validatorgetPhotographiesInEvent,validatorDeleteManyEventsPhotographies}