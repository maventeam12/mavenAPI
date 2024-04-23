
const { encrypt } = require("../helpers/handlePassword");
const db = require("../models");
const CompanyUser = db.companyUser;
const Op = db.Sequelize.Op;

// Create and Save a new companyUser
exports.create = async (req, res) => {
    // Create a companyUser
    const password = await encrypt(req.body.password);
    const companyUser = {
      name: req.body.name,
      phone: req.body.phone || "",
      email: req.body.email,
      username: req.body.username,
      password: password,
      isAdmin: req.body.isAdmin || false,
    };
  
    // Save CompanyUser in the database
    CompanyUser.create(companyUser)
      .then(data => {
        data.password = "";
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message:  "Some error occurred while creating company user."
              }
            }
          ]
        });
      });
};

// Retrieve all CompanyUsers from the database.
exports.findAll = (req, res) => {
  
  CompanyUser.findAll({
    attributes: {exclude: ['password']}})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message:  "Some error occurred while retrieving Company Users."
              }
            }
          ]
        });
      });
  };

// Find a single Company User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    CompanyUser.findByPk(id,{
      attributes: {exclude: ['password']}})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message: `Cannot find Company User with id=${id}.`
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
                message :  "Error retrieving Company User with id=" + id
              }
            }
          ]
        });
      });
  };

// Update a CompanyUser by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const companyUser={}
    if(req?.body?.name){
      companyUser.name = req.body.name
    }
    if(req?.body?.phone){
      companyUser.phone = req.body.phone
    }
    if(req?.body?.email){
      companyUser.email = req.body.email
    }
    if(req?.body?.username){
      companyUser.username = req.body.username
    }
    if(req?.body?.password){
      companyUser.password = await encrypt(req.body.password);
    }
    if(req?.body?.isAdmin == true ||req?.body?.isAdmin == false || req?.body?.isAdmin == 'true' ||req?.body?.isAdmin == 'false' ){
      companyUser.isAdmin = req.body.isAdmin
    }

    CompanyUser.update(companyUser, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Company User was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message: `Cannot update Company User with id=${id}. Maybe Company User was not found!`
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
                message:  "Error updating Company User with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a CompanyUser with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    CompanyUser.destroy({
      where: { id: id }
    })
      .then(num => {
        
        if (num == 1) {
          res.send({
            message: "Company User was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message: `Cannot delete Company User with id=${id}. Maybe Company User was not found!`
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
                message: "Could not delete Company User with id=" + id
              }
            }
          ]
        });
      });
  };

  exports.deleteMany = (req, res) => {
    const ids = req.body.ids;
    CompanyUser.destroy({
      where: { id: ids },
    })
      .then((num) => {
        if (num >= 1) {
          res.send({
            message: "Users were deleted successfully!",
          });
        } else {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete users. Maybe a Service was not found!`,
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
                message: "Could not delete Users",
              },
            },
          ],
        });
      });
  };