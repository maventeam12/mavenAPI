module.exports = (app) => {
  const contract = require("../controllers/contract.controller.js");
  const router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateContract,
    validatorgetAndDeleteContract,
    validatorgetContractsInClient,
    validatorupdateContract,
  } = require("../validators/contract.validator.js");

  // Create a new contract
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee","admin"]),
    validatorCreateContract,
    contract.create
  );

  // Retrieve all contract
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee","admin"]),
    contract.findAll
  );
  
  // Retrieve a single contract with id
  router.get(
    "/months/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client","employee","admin"]),
    validatorgetAndDeleteContract,
    contract.findOneForBill
  );
  // Retrieve all contract in client
  router.get(
    "/client/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client","employee","admin"]),
    validatorgetContractsInClient,
    contract.findAllForClient
  );

  // Retrieve a single contract with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client","employee","admin"]),
    validatorgetAndDeleteContract,
    contract.findOne
  );

  // Update a appointment with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee","admin"]),
    validatorgetAndDeleteContract,
    validatorupdateContract,
    contract.update
  );

  // Delete a contract with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    validatorgetAndDeleteContract,
    contract.delete
  );

  app.use("/api/contract", router);
};
