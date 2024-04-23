const {param , body, validationResult} = require("express-validator");
const db = require("../models");
const Appointment = db.appointment;
const Op = db.Sequelize.Op;

const validatorCreateAppointment = [
    body("name")
    .trim()
    .exists().withMessage({message:"appointment name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment name"}).bail()
    .isString().withMessage({message:"appointment name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment name must contain at least one character"}).bail(),

    body("businessName")
    .trim()
    .exists().withMessage({message:"appointment business name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment business name"}).bail()
    .isString().withMessage({message:"appointment business name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment business name must contain at least one character"}).bail(),

    body("phone")
    .trim()
    .exists().withMessage({message:"appointment phone name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment phone name"}).bail()
    .isString().withMessage({message:"appointment phone name field must be a String"}).bail()
    .isLength({ min: 10, max: 10 }).withMessage({message:"appointment phone name must be 10 numbers"}).bail()
    .isMobilePhone().withMessage({message:"appointment phone name field must be a phone number"}).bail(),

    body("message")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"appointment message field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment message"}).bail()
    .isString().withMessage({message:"appointment message field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment message must contain at least one character"}).bail(),

    body("service")
    .trim()
    .exists().withMessage({message:"appointment service field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment service"}).bail()
    .isString().withMessage({message:"appointment service field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment service must contain at least one character"}).bail(),

    body("isDone")
    .optional({nullable:true,checkFalsy: true})
    .exists()
    .withMessage({ message: "is done had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "is done must have a value" })
    .bail()
    .isBoolean()
    .withMessage({ message: "is done must be boolean" })
    .bail(),

    body("email")
    .exists()
    .withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail(),
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
const validatorgetAndDeleteAppointment = [
    param("id")
    .trim()
    .exists().withMessage({message:"appointment identifier had not been declared"}).bail()
    .notEmpty().withMessage({message:"appointment identifier must have a value"}).bail()
    .custom(async (value , {req}) => {

        const response = await Appointment.findAll({
            where:{
                id : value
            }
            
        }).catch(err => {
            return Promise.reject({message:"Some error occurred while bringing appointment, Please try refreshing your page."});
          });
        if (response.length == 0){
            return Promise.reject({message:"appointment does not exist"});
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
const validatorupdateAppointment = [

    body("name")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"appointment name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment name"}).bail()
    .isString().withMessage({message:"appointment name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment name must contain at least one character"}).bail(),

    body("businessName")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"appointment business name field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment business name"}).bail()
    .isString().withMessage({message:"appointment business name field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment business name must contain at least one character"}).bail(),

    body("message")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"appointment message field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment message"}).bail()
    .isString().withMessage({message:"appointment message field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment message must contain at least one character"}).bail(),

    body("service")
    .optional({nullable:true,checkFalsy: true})
    .trim()
    .exists().withMessage({message:"appointment service field had not been declared"}).bail()
    .notEmpty().withMessage({message:"must enter a value for appointment service"}).bail()
    .isString().withMessage({message:"appointment service field must be a String"}).bail()
    .isLength({min:1}).withMessage({message:"appointment service must contain at least one character"}).bail(),

    body("isDone")
    .optional({nullable:true,checkFalsy: true})
    .exists()
    .withMessage({ message: "is done had not been declared", errorCode: 102 })
    .bail()
    .notEmpty()
    .withMessage({ message: "is done must have a value", errorCode: 103 })
    .bail()
    .isBoolean()
    .withMessage({ message: "is done must be boolean", errorCode: 104 })
    .bail(),

    body("email")
    .optional({nullable:true,checkFalsy: true})
    .exists()
    .withMessage({message: "email field had not been declared"}).bail()
    .notEmpty().withMessage({ message: "must enter a value for email" }).bail()
    .isString().withMessage({ message: "email field must be a String" }).bail()
    .isEmail().withMessage({ message: "wrong email format" }).bail(),
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
const validatorDeleteManyAppointments = [
    body("ids")
      .exists().withMessage({message: "Appointments identifiers had not been declared"}).bail()
      .isArray().withMessage({message: "Appointments identifier must be an array",}).bail()
      .notEmpty().withMessage({ message: "Appointment id must have a value"}).bail()
      .custom(async (value, { req }) => {
          const response = await Appointment.findAll({
            where: {
              id: value,
            },
          }).catch((err) => {
            return Promise.reject({
              message:
                "Some error occurred while deleting Appointments , Please try refreshing your page.",
            });
          });
          if (response.length < value.length) {
            return Promise.reject({ message: "some Appointments do not exist" });
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
module.exports = {validatorCreateAppointment ,validatorDeleteManyAppointments, validatorgetAndDeleteAppointment , validatorupdateAppointment}