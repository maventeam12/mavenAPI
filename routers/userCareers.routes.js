module.exports = (app) => {
  const userCareer = require("../controllers/userCareer.controller.js");
  const router = require("express").Router();
  const uploadPdf = require("../middleware/uploadPDF.js");

  // middlewares
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateUserCareer,
    validatorgetAndDeleteUserCareer,
    validatorupdateUserCareer,
    validatorgetUserInCareer,
    validatorDeleteManySolicitudes,
  } = require("../validators/userCareer.validator.js");
  // Create a new userCareer
  router.post(
    "/",
    trimRequest.all,
    uploadPdf,
    validatorCreateUserCareer,
    userCareer.create
  );

  // Retrieve all userCareerc
  router.get(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    userCareer.findAll
  );

  // Retrieve all userCareer in career
  router.get(
    "/career/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetUserInCareer,
    userCareer.findAllInCareer
  );

  // Retrieve a single userCareer with id
  router.get(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorgetAndDeleteUserCareer,
    userCareer.findOne
  );

  // Update a userCareer with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    uploadPdf,
    roles(["admin"]),
    validatorgetAndDeleteUserCareer,
    validatorupdateUserCareer,
    userCareer.update
  );
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorDeleteManySolicitudes,
    userCareer.deleteMany
  );
  // Delete a userCareer with id
  router.delete(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["admin"]),
    validatorgetAndDeleteUserCareer,
    userCareer.delete
  );

  app.use("/api/userCareer", router);
};
