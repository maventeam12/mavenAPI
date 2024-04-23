module.exports = (app) => {
  const appointments = require("../controllers/appointments.controller.js");
  var router = require("express").Router();
  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateAppointment,
    validatorgetAndDeleteAppointment,
    validatorupdateAppointment,
    validatorDeleteManyAppointments,
  } = require("../validators/appointment.validator.js");
  // Create a new appointment
  router.post(
    "/",
    trimRequest.all,
    validatorCreateAppointment,
    appointments.create
  );

  // Retrieve all appointment
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    appointments.findAll
  );

  // Retrieve a single appointment with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteAppointment,
    appointments.findOne
  );

  // Update a appointment with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    validatorgetAndDeleteAppointment,
    validatorupdateAppointment,
    appointments.update
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    validatorDeleteManyAppointments,
    appointments.deleteMany
  );
  // Delete a appointment with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    validatorgetAndDeleteAppointment,
    appointments.delete
  );

  app.use("/api/appointments", router);
};
