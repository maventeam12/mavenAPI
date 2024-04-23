const db = require("../models");
const ClientMessage = db.clientMessage;



// Create and Save a new ClientMessage
exports.create = (req, res) => {
        const clientMessage = {
            message : req.body.message,
            clientId : req.body.clientId
          };
          // Save ClientMessage in the database
          ClientMessage.create(clientMessage)
            .then(data => {
        
            //implement here the saving of the file after copy the path in the db
              res.send(data);
            })
            .catch(err => {
              res.status(200).send({
                error:[
                  {
                    value : "",
                    msg : {
                      message:  "Some error occurred while creating the advertisement."
                    }
                  }
                ]
              });
            });
  };

// Update a ClientMessage by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const clientMessage = {};
  if(req?.body?.message){
    clientMessage.message = req.body.message
  }
  if(req?.body?.clientId){
    clientMessage.clientId = req.body.clientId
  }

  ClientMessage.update(clientMessage, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "advertisement was updated successfully."
        });
      } else {
        res.send({
          error:[
            {
              value : "",
              msg : {
                message: `Cannot update advertisement with id=${id}. Maybe advertisement was not found or req.body is empty!`
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
              message :   "Error updating advertisement with id=" + id
            }
          }
        ]
      });
    });
};


// Retrieve all ClientMessage from the database.
exports.findAll = (req, res) => {
  
  ClientMessage.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while retrieving advertisement ."
              }
            }
          ]
        });
      });
  };

// Find  all Messages for an contract with an id
exports.findAllForClient = (req, res) => {
    const id = req.params.id;
  
    ClientMessage.findAll({
        where:{
            clientId: id
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
                  message :   `Cannot find advertisement with id=${id}.`
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
                message :  "Error retrieving advertisement with id=" + id
              }
            }
          ]
        });
      });
  };

// Find a single ClientMessage with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ClientMessage.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message :  `Cannot find advertisement solicitud with id=${id}.`
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
                message :  "Error retrieving advertisement with id=" + id
              }
            }
          ]
        });
      });
  };


// Delete a ClientMessage with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    ClientMessage.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "advertisement was deleted successfully!"
          });
          
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message :  `Cannot delete advertisement with id=${id}. Maybe advertisement was not found!`
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
                message :  "Could not delete advertisement with id=" + id
              }
            }
          ]
        });
      });
  };
  exports.deleteMany = (req, res) => {
    const ids = req.body.ids;
    ClientMessage.destroy({
      where: { id: ids },
    })
      .then((num) => {
        if (num >= 1) {
          res.send({
            message: "advertisement was deleted successfully!",
          });
        } else {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete advertisement. Maybe a Service was not found!`,
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
                message: "Could not delete advertisement",
              },
            },
          ],
        });
      });
  };