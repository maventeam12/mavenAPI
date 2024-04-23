
const db = require("../models");
const Skill = db.skill;
const Op = db.Sequelize.Op;

// Create and Save a new Skill
exports.create = (req, res) => {
    // Create a Skill
    const skill = {
      description: req.body.description,
      careerId: req.body.careerId
    };
  
    // Save Skill in the database
    Skill.create(skill)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating the Skill."
              }
            }
          ]
        });
      });
  };

// Retrieve all Skills from the database.
exports.findAll = (req, res) => {
  
    Skill.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message : "Some error occurred while retrieving Skills."
              }
            }
          ]
        });
      });
  };

// Find  all Skills for an carrer with an id
exports.findAllInCareer = (req, res) => {
    const id = req.params.id;
  
    Skill.findAll({
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
                  message : "Could not find career with id=" + id
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
                message :  "Error retrieving skills "
              }
            }
          ]
        });
      });
  };

// Find a single Skill with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Skill.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot find Skill with id=${id}.`
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
                message : "Error retrieving skill with id=" + id
              }
            }
          ]
        });
      });
  };

// Update a Skill by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Skill.update({description: req.body.description}, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Skill was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message :  `Cannot update Skill with id=${id}. Maybe Skill was not found or req.body is empty!`
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
                message : "Error updating Skill with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a Skill with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Skill.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Skill was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot delete Skill with id=${id}. Maybe Skill was not found!`
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
                message : "Could not delete Skill with id=" + id
              }
            }
          ]
        });
      });
  };