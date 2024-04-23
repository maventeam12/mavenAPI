
const { encrypt } = require("../helpers/handlePassword");
const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new Client
exports.create = async (req, res) => {
    // Create a Client
    const password = await encrypt(req.body.password);
    const client = {
      name: req.body.name,
      phone: req.body.phone || "",
      email: req.body.email,
      address: req.body.address,
      username: req.body.username,
      password: password,
      isImportant: req.body.isImportant || false,
      logoFile:req?.file?.path || ""
    };
  
    // Save Client in the database
    Client.create(client)
      .then(data => {
        data.password = "";
        res.send(data);
      })
      .catch(err => {
        if(req?.file?.path){
          fs.unlinkSync(req.file.path);
        }
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message:  "Some error occurred while creating Client."
              }
            }
          ]
        });
      });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
  
    Client.findAll({
      attributes: {exclude: ['password']}
    ,order:[
      ['isImportant','DESC']
    ]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message:  "Some error occurred while retrieving Client."
              }
            }
          ]
        });
      });
  };
  

// Find a single Client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Client.findByPk(id,{
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
                  message: `Cannot find Client with id=${id}.`
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
                message :  "Error retrieving Client with id=" + id
              }
            }
          ]
        });
      });
  };

// Update a Client by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const client={}
    if(req?.body?.name){
      client.name = req.body.name
    }
    if(req?.body?.phone){
      client.phone = req.body.phone
    }
    if(req?.body?.email){
      client.email = req.body.email
    }
    if(req?.body?.address){
      client.address = req.body.address
    }
    if(req?.body?.username){
      client.username = req.body.username
    }
    if(req?.body?.password){
      client.password = await encrypt(req.body.password);
    }
    if(req?.body?.isImportant == true || req?.body?.isImportant == false ||  req?.body?.isImportant == 'true' || req?.body?.isImportant == 'false'){
      client.isImportant = req.body.isImportant
    }
    if (req?.file?.path) {
      client.logoFile = req.file.path;
      try {
        const oldValue = await Client.findByPk(id);
        if(oldValue.dataValues.logoFile){
  
          fs.unlinkSync(oldValue.dataValues.logoFile);
        }
      } catch (error) {}
    }
    if (req?.body?.logoFile === "" && !req?.file?.path) {
      client.logoFile = req.body.logoFile;
      const oldValue = await Client.findByPk(id);
      if (oldValue.dataValues.logoFile) {
        
        fs.unlinkSync(oldValue.dataValues.logoFile);
      }
    }
    Client.update(client, {
      where: { id: id },
      attributes: {exclude: ['password']}
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Client was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message: `Cannot update Client with id=${id}. Maybe Client was not found!`
                }
              }
            ]
          });
        }
      })
      .catch(err => {
        if(req?.file?.path){
          fs.unlinkSync(req.file.path);
        }
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message:  "Error updating client with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a Client with the specified id in the request
exports.delete = async(req, res) => {
  const id = req.params.id;
  try {
    const clientData = await Client.findOne({
      where: { id: id },
    })
    Client.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          if(clientData.dataValues.logoFile){
            fs.unlinkSync(clientData.dataValues.logoFile);
          } 
          res.send({
            message: "Client was deleted successfully!",
          });
        } else {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete Client with id=${id}. Maybe Client was not found!`,
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
                message: "Could not delete Client with id=" + id,
              },
            },
          ],
        });
      });
  } catch (err) {
    
  }

};
  exports.deleteMany = (req, res) => {
    const ids = req.body.ids;
    let approve = true;
    ids.forEach(async (id) => {
      Client.findOne({
        where: { id: id },
      })
        .then((data) => {
          Client.destroy({
            where: { id: id },
          })
            .then((num) => {
              if (num != 1) {
                res.send({
                  error: [
                    {
                      value: "",
                      msg: {
                        message: `Cannot delete Clients. please refresh your page!`,
                      },
                    },
                  ],
                });
                approve = false;
                return
              }
              if(data.dataValues.logoFile){
                fs.unlinkSync(data.dataValues.logoFile);
              } 
            })
            .catch((err) => {
              res.status(200).send({
                error: [
                  {
                    value: "",
                    msg: {
                      message: "Could not delete Clients",
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
                  message: `Cannot delete Clients. please refresh your page!`,
                },
              },
            ],
          });
        });
    });
    if (approve) {
      res.send({
        message: "Clients was deleted successufly!",
      });
    }
  };
  