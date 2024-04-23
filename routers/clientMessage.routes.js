module.exports = (app) => {
  const clientMessage = require("../controllers/clientMessage.controller.js");
  const router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateClientMessage,
    validatorgetAndDeleteClientMessage,
    validatorgetClientMessageInClient,
    validatorupdateClientMessage,
    validatorDeleteManyMessages,
  } = require("../validators/clientMessage.validator.js");

  // Create a new clientMessage
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorCreateClientMessage,
    clientMessage.create
  );

  // Retrieve all clientMessage
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    clientMessage.findAll
  );

  // Retrieve all clientMessage in client
  router.get(
    "/client/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client", "employee", "admin"]),
    validatorgetClientMessageInClient,
    clientMessage.findAllForClient
  );

  // Retrieve a single clientMessage with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client", "employee", "admin"]),
    validatorgetAndDeleteClientMessage,
    clientMessage.findOne
  );

  // Update a clientMessage with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteClientMessage,
    validatorupdateClientMessage,
    clientMessage.update
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorDeleteManyMessages,
    clientMessage.deleteMany
  );
  // Delete a clientMessage with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteClientMessage,
    clientMessage.delete
  );

  app.use("/api/clientMessage", router);
};
