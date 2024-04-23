module.exports = (app) => {
  const responsabilities = require("../controllers/responsabilities.controller.js");
  var router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateResponsability,
    validatorgetAndDeleteResponsability,
    validatorupdateResponsability,
    validatorgetResponsabilitiesInCareer,
  } = require("../validators/responsabilities.validator.js");
  // Create a new responsabilities
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorCreateResponsability,
    responsabilities.create
  );

  // Retrieve all responsabilities
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    responsabilities.findAll
  );

  // Retrieve all responsabilities in career
  router.get(
    "/career/:id",
    trimRequest.all,
    validatorgetResponsabilitiesInCareer,
    responsabilities.findAllInCareer
  );

  // Retrieve a single responsabilities with id
  router.get(
    "/:id",
    trimRequest.all,
    validatorgetAndDeleteResponsability,
    responsabilities.findOne
  );

  // Update a responsabilities with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteResponsability,
    validatorupdateResponsability,
    responsabilities.update
  );

  // Delete a responsabilities with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteResponsability,
    responsabilities.delete
  );

  app.use("/api/responsabilities", router);
};
