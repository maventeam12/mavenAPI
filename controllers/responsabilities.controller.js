
const db = require("../models");
const Responsability = db.responsability;
const Op = db.Sequelize.Op;

// Create and Save a new Responsability
exports.create = (req, res) => {
    // Create a Responsability
    const responsability = {
      description: req.body.description,
      careerId: req.body.careerId
    };
  
    // Save Responsability in the database
    Responsability.create(responsability)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating the Responsability."
              }
            }
          ]
        });
      });
  };

// Retrieve all Responsabilities from the database.
exports.findAll = (req, res) => {
  
    Responsability.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while retrieving Responsabilities."
              }
            }
          ]
        });
      });
  };

// Find  all Responsabilities for an carrer with an id
exports.findAllInCareer = (req, res) => {
    const id = req.params.id;
  
    Responsability.findAll({
        where:{
            careerId: id
        }
    })
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message :`Cannot find career with id=${id}.`
                }
              }
            ]
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Error retrieving career with id=" + id
              }
            }
          ]
        });
      });
  };

// Find a single Responsability with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Responsability.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot find Responsability with id=${id}.`
                }
              }
            ]
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message : "Error retrieving Responsability with id=" + id
              }
            }
          ]
        });
      });
  };

// Update a Responsability by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Responsability.update({description: req.body.description}, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Responsability was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message :`Cannot update Responsability with id=${id}. Maybe Responsability was not found or request is empty!`
                }
              }
            ]
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Error updating Responsability with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a Responsability with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Responsability.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Responsability was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot delete Responsability with id=${id}. Maybe Responsability was not found!`
                }
              }
            ]
          });
        }
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Could not delete Responsability with id=" + id
              }
            }
          ]
        });
      });
  };  