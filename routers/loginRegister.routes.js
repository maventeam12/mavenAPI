module.exports = (app) => {
    const loginRegister = require("../controllers/loginRegister.controller.js");
    var router = require("express").Router();
    // middlewares
    const checkUser = require("../middleware/checkUser.js");
    const roles = require("../middleware/roles.js");
    const session = require("../middleware/session.js");

    // Retrieve all hours
    router.get(
      "/",
      session,
      checkUser,
      roles(["admin"]),
      loginRegister.findAll
    );


    app.use("/api/loginRegister", router);
  };
  