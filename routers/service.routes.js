module.exports = (app) => {
  const services = require("../controllers/service.controller.js");
  var router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateService,
    validatorgetAndDeleteService,
    validatorupdateService,
    validatorDeleteManyServices,
  } = require("../validators/service.validator.js");
  // Create a new Service
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorCreateService,
    services.create
  );

  // Retrieve all Service
  router.get(
    "/",
    trimRequest.all,
    services.findAll
  );

  // Retrieve a single Service with id
  router.get(
    "/:id",
    trimRequest.all,
    validatorgetAndDeleteService,
    services.findOne
  );

  // Update a Service with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteService,
    validatorupdateService,
    services.update
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorDeleteManyServices,
    services.deleteMany
  );

  // Delete a Service with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteService,
    services.delete
  );

  app.use("/api/services", router);
};
