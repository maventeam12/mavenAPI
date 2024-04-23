module.exports = (app) => {
  const careers = require("../controllers/careers.controller.js");
  var router = require("express").Router();

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateCareer,
    validatorgetAndDeleteCareer,
    validatorupdateCareer,
    validatorDeleteManyCareers,
  } = require("../validators/career.validator.js");
  // Create a new career
  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorCreateCareer,
    careers.create
  );
  router.get(
    "/website",
    trimRequest.all,
    careers.findAll
  );
  // Retrieve all career
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    careers.findAll
  );
  router.get(
    "/website/:id",
    trimRequest.all,
    validatorgetAndDeleteCareer,
    careers.findOne
  );
  // Retrieve a single career with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteCareer,
    careers.findOne
  );

  // Update a career with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteCareer,
    validatorupdateCareer,
    careers.update
  );

  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorDeleteManyCareers,
    careers.deleteMany
  );
  // Delete a career with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    validatorgetAndDeleteCareer,
    careers.delete
  );

  app.use("/api/careers", router);
};
