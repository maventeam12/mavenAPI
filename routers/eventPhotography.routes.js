module.exports = (app) => {
  const eventPhotography = require("../controllers/eventPhotographies.controller.js");
  const router = require("express").Router();
  const uploadPhotography = require("../middleware/uploadImageEventPhotography.js");

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateEventPhotography,
    validatorgetAndDeleteEventPhotography,
    validatorgetPhotographiesInEvent,
    validatorDeleteManyEventsPhotographies,
    validatorupdateEventPhotography,
  } = require("../validators/eventPhotography.validator.js");
  // Create a new eventPhotography
  router.post(
    "/",
    trimRequest.all,
    // session,
    // checkUser,
    // roles(["employee", "admin"]),
    uploadPhotography,
    validatorCreateEventPhotography,
    eventPhotography.create
  );
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    uploadPhotography,
    validatorgetAndDeleteEventPhotography,
    validatorupdateEventPhotography,
    eventPhotography.update
  );

  // Retrieve all eventPhotography
  router.get(
    "/",
    trimRequest.all,
    eventPhotography.findAll
  );

  // Retrieve all eventPhotography in event
  router.get(
    "/event/:id",
    trimRequest.all,
    validatorgetPhotographiesInEvent,
    eventPhotography.findAllInEvent
  );

  // Retrieve a single eventPhotography with id
  router.get(
    "/:id",
    trimRequest.all,
    validatorgetAndDeleteEventPhotography,
    eventPhotography.findOne
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorDeleteManyEventsPhotographies,
    eventPhotography.deleteMany
  );
  // Delete a eventPhotography with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteEventPhotography,
    eventPhotography.delete
  );

  app.use("/api/eventPhotography", router);
};
