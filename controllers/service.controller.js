
const db = require("../models");
const Service = db.service;
const Op = db.Sequelize.Op;

// Create and Save a new service
exports.create = (req, res) => {
    // Create a service
    const service = {
      name: req.body.name,
    };
  
    // Save Tutorial in the database
    Service.create(service)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating the service."
              }
            }
          ]
        });
      });
  };

// Retrieve all Services from the database.
exports.findAll = (req, res) => {
  
    Service.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :   "Some error occurred while retrieving services."
              }
            }
          ]
        });
      });
  };

// Find a single Service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Service.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot find service with id=${id}.`
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
                message : "Error retrieving service with id=" + id
              }
            }
          ]
        });
      });
  };

// Update a Service by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Service.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot update Service with id=${id}. Maybe Service was not found or req.body is empty!`
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
                message :  "Error updating Tutorial with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a Service with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Service.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Service was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot delete Service with id=${id}. Maybe Service was not found!`
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
                message : "Could not delete Service with id=" + id
              }
            }
          ]
        });
      });
  };


  exports.deleteMany = (req, res) => {
    const ids = req.body.ids;
    Service.destroy({
      where: { id: ids },
    })
      .then((num) => {
        if (num >= 1) {
          res.send({
            message: "Services was deleted successfully!",
          });
        } else {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete Services. Maybe a Service was not found!`,
                },
              },
            ],
          });
        }
      })
      .catch((err) => {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: "Could not delete Services",
              },
            },
          ],
        });
      });
  };