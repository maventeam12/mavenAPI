module.exports = (app) => {
  const clients = require("../controllers/clients.controller.js");
  var router = require("express").Router();
  const uploadLogo = require("../middleware/uploadClientLogo.js");

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateClient,
    validatorgetAndDeleteClient,
    validatorupdateClient,
    validatorDeleteManyClients,
  } = require("../validators/client.validator.js");
  // Create a new clients

  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles([ "employee", "admin"]),
    uploadLogo,
    validatorCreateClient,
    clients.create
  );
  router.get(
    "/website",
    trimRequest.all,
    clients.findAll
  );
  // Retrieve all clients
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    clients.findAll
  );

  // Retrieve a single clients with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client", "employee", "admin"]),
    validatorgetAndDeleteClient,
    clients.findOne
  );

  // Update a clients with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["client", "employee", "admin"]),
    uploadLogo,
    validatorgetAndDeleteClient,
    validatorupdateClient,
    clients.update
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles([ "admin"]),
    validatorDeleteManyClients,
    clients.deleteMany
  );
  // Delete a clients with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles([ "admin"]),
    validatorgetAndDeleteClient,
    clients.delete
  );

  app.use("/api/client", router);
};
