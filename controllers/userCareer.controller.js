const db = require("../models");
const fs = require("fs");
const UserCareer = db.userCareer;
// Create and Save a new UserCareer
exports.create = (req, res) => {
    const userCareer = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      isChecked: false,
      career: req.body.career,
      cvFile:req?.file?.path || "",
    };
    // Save UserCareer in the database
    UserCareer.create(userCareer)
      .then(data => {
  
      //implement here the saving of the file after copy the path in the db
        res.send(data);
      })
      .catch(err => {
        if (req?.file?.path) {
          fs.unlinkSync(req.file.path);
        }
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating the career solicitud."
              }
            }
          ]
        });
      });

  
  };

// Update a UserCareer by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const solicitud = {};
  if (req?.body?.name) {
    solicitud.name = req.body.name;
  }
  if (req?.body?.email) {
    solicitud.email = req.body.email;
  }
  if (req?.body?.message) {
    solicitud.message = req.body.message;
  }
  if (req?.body?.career) {
    solicitud.career = req.body.career;
  }
  if (req?.body?.isChecked) {
    solicitud.isChecked = req.body.isChecked;
  }
  if (req?.file?.path) {
    solicitud.cvFile = req.file.path;
    try {
      const oldValue = await UserCareer.findByPk(id);
      if(oldValue.dataValues.cvFile){

        fs.unlinkSync(oldValue.dataValues.cvFile);
      }
    } catch (error) {}
  }
  if (req?.body?.cvFile === "" && !req?.file?.path) {
    solicitud.cvFile = req.body.cvFile;
    const oldValue = await UserCareer.findByPk(id);
    if (oldValue.dataValues.cvFile) {
      
      fs.unlinkSync(oldValue.dataValues.cvFile);
    }
  }
  UserCareer.update(solicitud, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "career solicitud was updated successfully."
        });
      } else {
        res.send({
          error:[
            {
              value : "",
              msg : {
                message : `Cannot update career solicitud  with id=${id}. Maybe UserCareer was not found or req.body is empty!`
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
              message :"Error updating career solicitud  with id=" + id
            }
          }
        ]
      });
    });
};


// Retrieve all UserCareer from the database.
exports.findAll = (req, res) => {
  
    UserCareer.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while retrieving career solicitud ."
              }
            }
          ]
        });
      });
  };

// Find  all UserCareer for an carrer with an id
exports.findAllInCareer = (req, res) => {
    const id = req.params.id;
  
    UserCareer.findAll({
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
                  message : `Cannot find career with id=${id}.`
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
                message : "Error retrieving career with id=" + id
              }
            }
          ]
        });
      });
  };

// Find a single UserCareer with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    UserCareer.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot find career solicitud with id=${id}.`
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
                message : "Error retrieving career solicitud with id=" + id
              }
            }
          ]
        });
      });
  };


// Delete a UserCareer with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
try {
  const careerdata = await UserCareer.findOne({
    where: { id: id }
  });
  UserCareer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        if(careerdata.dataValues.cvFile){
          fs.unlinkSync(careerdata.dataValues.cvFile);
        } 
        res.send({
          message: "career solicitud was deleted successfully!"
        });
        
      } else {
        res.send({
          error:[
            {
              value : "",
              msg : {
                message : `Cannot delete career solicitud with id=${id}. Maybe career solicitud was not found!`
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
              message :"Could not delete career solicitud with id=" + id
            }
          }
        ]
      });
    });
} catch (err) {
  res.status(200).send({
    error:[
      {
        value : "",
        msg : {
          message :"Could not delete career solicitud with id=" + id
        }
      }
    ]
  });
}
   
  };

  exports.deleteMany = (req, res) => {
    const ids = req.body.ids;
    let approve = true;
    ids.forEach(async (id) => {
      UserCareer.findOne({
        where: { id: id },
      })
        .then((data) => {
          UserCareer.destroy({
            where: { id: id },
          })
            .then((num) => {
              if (num != 1) {
                res.send({
                  error: [
                    {
                      value: "",
                      msg: {
                        message: `Cannot delete career Solicitudes. please refresh your page!`,
                      },
                    },
                  ],
                });
                approve = false;
              }
              if(data.dataValues.cvFile){
                fs.unlinkSync(data.dataValues.cvFile);
              } 
            })
            .catch((err) => {
              res.status(200).send({
                error: [
                  {
                    value: "",
                    msg: {
                      message: "Could not delete career Solicitudes",
                    },
                  },
                ],
              });
              approve = false;
            });
        })
        .catch((err) => {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete career Solicitudes. please refresh your page!`,
                },
              },
            ],
          });
        });
    });
    if (approve) {
      res.send({
        message: "career Solicitudes was deleted successufly!",
      });
    }
  };
  