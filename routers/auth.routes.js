
module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    var router = require("express").Router();
    const uploadLogo = require("../middleware/uploadClientLogo.js")
    const {validatorLogin,validatorRegister} = require("../validators/auth.validator.js")
    // middlewares
    
    // Create a new auth
  
    router.post("/register",uploadLogo,validatorRegister, auth.register);
    router.post("/login",validatorLogin, auth.logIn);
    router.post("/access", auth.access);
  
   


    app.use('/api/auth', router);

  };