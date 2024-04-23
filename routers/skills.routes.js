module.exports = (app) => {
  const skills = require("../controllers/skills.controller.js");
  var router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateSkill,
    validatorgetAndDeleteSkill,
    validatorupdateSkill,
    validatorgetSkillsInCareer,
  } = require("../validators/skills.validator.js");
  // Create a new responsabilities
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorCreateSkill,
    skills.create
  );

  // Retrieve all responsabilities
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    skills.findAll
  );

  // Retrieve all responsabilities in career
  router.get(
    "/career/:id",
    trimRequest.all,
    validatorgetSkillsInCareer,
    skills.findAllInCareer
  );

  // Retrieve a single responsabilities with id
  router.get(
    "/:id",
    trimRequest.all,
    validatorgetAndDeleteSkill,
    skills.findOne
  );

  // Update a responsabilities with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteSkill,
    validatorupdateSkill,
    skills.update
  );

  // Delete a responsabilities with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteSkill,
    skills.delete
  );

  app.use("/api/skills", router);
};
