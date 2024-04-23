module.exports = (app) => {
  const companyUser = require("../controllers/companyUsers.controller.js");
  var router = require("express").Router();
  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateCompanyUser,
    validatorgetAndDeleteCompanyUser,
    validatorupdateCompanyUser,
    validatorDeleteManyUsers,
  } = require("../validators/companyUser.validator.js");
  // Create a new companyUser

  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles([ "admin"]),
    validatorCreateCompanyUser,
    companyUser.create
  );

  // Retrieve all companyUser
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    companyUser.findAll
  );

  // Retrieve a single companyUser with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteCompanyUser,
    companyUser.findOne
  );

  // Update a companyUser with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteCompanyUser,
    validatorupdateCompanyUser,
    companyUser.update
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles([ "admin"]),
    validatorDeleteManyUsers,
    companyUser.deleteMany
  );
  // Delete a companyUser with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    validatorgetAndDeleteCompanyUser,
    companyUser.delete
  );

  app.use("/api/companyUser", router);
};
