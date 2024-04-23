const { param, body, validationResult } = require("express-validator");
const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;
const fs = require("fs");
const validatorCreateBlog = [
  body("description")
    .trim()
    .exists()
    .withMessage({ message: "blog description field had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "must enter a value for blog description" })
    .bail()
    .isString()
    .withMessage({ message: "blog description field must be a String" })
    .bail()
    .isLength({ min: 1 })
    .withMessage({
      message: "blog description must contain at least one character",
    })
    .bail(),

  body("title")
    .trim()
    .exists()
    .withMessage({ message: "blog title name field had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "must enter a value for blog title name" })
    .bail()
    .isString()
    .withMessage({ message: "blog title name field must be a String" })
    .bail()
    .isLength({ min: 1 })
    .withMessage({ message: "blog title name must be 10 numbers" })
    .bail(),

  body("content")
    .trim()
    .exists()
    .withMessage({ message: "blog content name field had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "must enter a value for blog content name" })
    .bail()
    .isString()
    .withMessage({ message: "blog content name field must be a String" })
    .bail()
    .isLength({ min: 1 })
    .withMessage({ message: "blog content name must be 10 numbers" })
    .bail(),

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
const validatorgetAndDeleteBlog = [
  param("id")
    .trim()
    .exists()
    .withMessage({ message: "Blog identifier had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "Blog identifier must have a value" })
    .bail()
    .custom(async (value, { req }) => {
      const response = await Blog.findAll({
        where: {
          id: value,
        },
      }).catch((err) => {
        return Promise.reject({
          message:
            "Some error occurred while bringing Blog , Please try refreshing your page.",
        });
      });
      if (response.length == 0) {
        return Promise.reject({ message: "Blog does not exist" });
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
const validatorupdateBlog = [
  body("description")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .exists()
    .withMessage({ message: "blog description field had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "must enter a value for blog description" })
    .bail()
    .isString()
    .withMessage({ message: "blog description field must be a String" })
    .bail()
    .isLength({ min: 1 })
    .withMessage({
      message: "blog description must contain at least one character",
    })
    .bail(),

  body("title")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .exists()
    .withMessage({ message: "blog title name field had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "must enter a value for blog title name" })
    .bail()
    .isString()
    .withMessage({ message: "blog title name field must be a String" })
    .bail()
    .isLength({ min: 1 })
    .withMessage({ message: "blog title name must be 10 numbers" })
    .bail(),

  body("content")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .exists()
    .withMessage({ message: "blog content name field had not been declared" })
    .bail()
    .notEmpty()
    .withMessage({ message: "must enter a value for blog content name" })
    .bail()
    .isString()
    .withMessage({ message: "blog content name field must be a String" })
    .bail()
    .isLength({ min: 1 })
    .withMessage({ message: "blog content name must be 10 numbers" })
    .bail(),

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
const validatorDeleteManyBlogs = [
  body("ids")
    .exists().withMessage({message: "blogs identifiers had not been declared"}).bail()
    .isArray().withMessage({message: "blogs identifier must be an array",}).bail()
    .notEmpty().withMessage({ message: "blog id must have a value"}).bail()
    .custom(async (value, { req }) => {
        const response = await Blog.findAll({
          where: {
            id: value,
          },
        }).catch((err) => {
          return Promise.reject({
            message:
              "Some error occurred while deleting Blogs , Please try refreshing your page.",
          });
        });
        if (response.length < value.length) {
          return Promise.reject({ message: "some Blogs do not exist" });
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
module.exports = {
  validatorCreateBlog,
  validatorgetAndDeleteBlog,
  validatorupdateBlog,
  validatorDeleteManyBlogs
};
