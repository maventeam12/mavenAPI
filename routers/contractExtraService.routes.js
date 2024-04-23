module.exports = (app) => {
  const contractExtraServices = require("../controllers/contractExtraServices.controller.js");
  const router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateContractExtraService,
    validatorgetAndDeleteContractExtraService,
    validatorgetContractExtraServicesInContract,
    validatorupdateContractExtraService,
    validatorDeleteManyExtraServices,
  } = require("../validators/contractExtraService.validator.js");

  // Create a new contractExtraServices
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin",'client']),
    validatorCreateContractExtraService,
    contractExtraServices.create
  );

  // Retrieve all contractExtraServices
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    contractExtraServices.findAll
  );

  // Retrieve all contractExtraServices in contract
  router.get(
    "/contract/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client","employee", "admin"]),
    validatorgetContractExtraServicesInContract,
    contractExtraServices.findAllInContract
  );

  // Retrieve a single contractExtraServices with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client","employee", "admin"]),
    validatorgetAndDeleteContractExtraService,
    contractExtraServices.findOne
  );

  // Update a contractExtraServices with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteContractExtraService,
    validatorupdateContractExtraService,
    contractExtraServices.update
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorDeleteManyExtraServices,
    contractExtraServices.deleteMany
  );
  // Delete a contractExtraServices with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteContractExtraService,
    contractExtraServices.delete
  );

  app.use("/api/contractExtraService", router);
};
