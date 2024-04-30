
const db = require("../models");
const Appointment = db.appointment;
const Op = db.Sequelize.Op;

// Create and Save a new appointment
exports.create = (req, res) => {
    // Create a service
    const appointment = {
      name: req.body.name,
      businessName: req.body.businessName,
      email: req.body.email,
      message: req.body.message,
      phone: req.body.phone,
      service: req.body.service,
      isDone: req.body.isDone || false
    };
  
    // Save appointment in the database
    Appointment.create(appointment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating the appointment."
              }
            }
          ]
        });
      });
  };

// Retrieve all appointments from the database.
exports.findAll = (req, res) => {
  
    Appointment.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message : "Some error occurred while retrieving Appointments."
              }
            }
          ]
        });
      });
  };

// Find a single Appointment with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Appointment.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot find Appointment with id=${id}.`
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
                message :  `Cannot find Appointment with id=${id}.`
              }
            }
          ]
        });
      });
  };

// Update a Appointment by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Appointment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Appointment was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`
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
                message :  "Error updating Appointment with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a Appointment with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Appointment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Appointment was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message :`Cannot delete Appointment with id=${id}. Maybe Appointment was not found!`
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
                message :  "Could not delete Appointment with id=" + id
              }
            }
          ]
        });
      });
  };

  exports.deleteMany = async (req, res) => {
    const ids = req.body.ids;
    let approve = true;
    Appointment.destroy({
      where: { id: ids },
    })
      .then((num) => {
        if (num < ids.lenght) {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete all Appointments. please refresh your page!`,
                },
              },
            ],
          });
          approve = false;
          return;
        }
      })
      .catch((err) => {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot delete Appointments. Maybe an Appointment was not found!`,
              },
            },
          ],
        });
        approve = false;
      });
    if (approve) {
      res.send({
        message: "Appointments was deleted successufly!",
      });
    }
  };
  