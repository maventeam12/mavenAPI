module.exports = (app) => {
  const contractServices = require("../controllers/contractServices.controller.js");
  const router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateContractService,
    validatorgetAndDeleteContractService,
    validatorgetContractServicesInContract,
    validatorupdateContractService,
  } = require("../validators/contractServices.validator.js");

  // Create a new contractServices
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorCreateContractService,
    contractServices.create
  );

  // Retrieve all contractServices
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    contractServices.findAll
  );

  // Retrieve all contractServices in contract
  router.get(
    "/contract/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client", "employee", "admin"]),
    validatorgetContractServicesInContract,
    contractServices.findAllInContract
  );

  // Retrieve a single contractServices with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client", "employee", "admin"]),
    validatorgetAndDeleteContractService,
    contractServices.findOne
  );

  // Update a contractServices with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteContractService,
    validatorupdateContractService,
    contractServices.update
  );

  // Delete a contractServices with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteContractService,
    contractServices.delete
  );

  app.use("/api/contractService", router);
};
