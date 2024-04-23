module.exports = (app) => {
  const contractDetail = require("../controllers/contractDetails.controller.js");
  const router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateContractDetail,
    validatorgetAndDeleteContractDetail,
    validatorgetContractDetailsInContract,
    validatorupdateContractDetail,
  } = require("../validators/contractDetails.validator.js");

  // Create a new contractDetail
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorCreateContractDetail,
    contractDetail.create
  );

  // Retrieve all contractDetail
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    contractDetail.findAll
  );

  // Retrieve all contractDetail in contract
  router.get(
    "/contract/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client","employee", "admin"]),
    validatorgetContractDetailsInContract,
    contractDetail.findAllInContract
  );

  // Retrieve a single contractDetail with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client", "employee", "admin"]),
    validatorgetAndDeleteContractDetail,
    contractDetail.findOne
  );

  // Update a contractDetail with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteContractDetail,
    validatorupdateContractDetail,
    contractDetail.update
  );

  // Delete a contractDetail with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteContractDetail,
    contractDetail.delete
  );

  app.use("/api/contractDetail", router);
};
