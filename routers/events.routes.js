module.exports = (app) => {
  const event = require("../controllers/events.controller.js");
  const router = require("express").Router();
  const uploadImage = require("../middleware/uploadImageEvent.js");

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateEvent,
    validatorgetAndDeleteEvent,
    validatorupdateEvent,
    validatorDeleteManyEvents
  } = require("../validators/events.validator.js");
  // Create a new event
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    uploadImage,
    validatorCreateEvent,
    event.create
  );

  // Retrieve all event
  router.get(
    "/",
    trimRequest.all,
    event.findAll
  );

  // Retrieve a single event with id
  router.get(
    "/:id",
    trimRequest.all,
    validatorgetAndDeleteEvent,
    event.findOne
  );

  // Update a event with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    uploadImage,
    validatorgetAndDeleteEvent,
    validatorupdateEvent,
    event.update
  );
// Delete many
router.delete(
  "/many",
  trimRequest.all,
  session,
  checkUser,
  roles(["employee", "admin"]),
  validatorDeleteManyEvents,
  event.deleteMany
);
  // Delete a event with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteEvent,
    event.delete
  );

  app.use("/api/event", router);
};
