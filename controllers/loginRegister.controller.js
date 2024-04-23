
const db = require("../models");
const LoginRegister = db.loginRegister;

// Create and Save a new appointment

// Retrieve all appointments from the database.
exports.findAll = (req, res) => {
  
    LoginRegister.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error:[
            {
              value : "",
              msg : {
                message : "Some error occurred while retrieving Login Hours."
              }
            }
          ]
        });
      });
  };
