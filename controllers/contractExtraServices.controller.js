
const db = require("../models");
const ContractExtraService = db.contractExtraService;
const Op = db.Sequelize.Op;

// Create and Save a new ContractExtraService
exports.create = (req, res) => {
    // Create a ContractExtraService
    const contractExtraService = {
    serviceName: req.body.serviceName,
    isApproved : req.body.isApproved,
    contractId: req.body.contractId,
    };
  
    // Save ContractDetail in the database
    ContractExtraService.create(contractExtraService)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating contract extra service."
              }
            }
          ]
        });
      });
  };

// Retrieve all ContractExtraService from the database.
exports.findAll = (req, res) => {
  
    ContractExtraService.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(200).send({
          error:[
            {
              value : "",
              msg : {
                message : "Some error occurred while retrieving Contract extra service."
              }
            }
          ]
        });
      });
  };

// Find  all ContractExtraService for an carrer with an id
exports.findAllInContract = (req, res) => {
    const id = req.params.id;
  
    ContractExtraService.findAll({
        where:{
            contractId: id
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
                  message : "Could not find contract with id=" + id
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
                message :  "Error retrieving extra services"
              }
            }
          ]
        });
      });
  };

// Find a single ContractExtraService with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ContractExtraService.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot find extra service with id=${id}.`
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
                message : "Error retrieving extra service with id=" + id
              }
            }
          ]
        });
      });
  };

// Update a ContractExtraService by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const service = {};
    if(req?.body?.serviceName){
        service.serviceName = req.body.serviceName
      }
      if(req?.body?.isApproved == true || req?.body?.isApproved == false){
        service.isApproved = req.body.isApproved
      }
      if(req?.body?.contractId){
        service.contractId = req.body.contractId
      }

      ContractExtraService.update(service, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "contract extra service was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message :  `Cannot update contract extra service with id=${id}. Maybe contract extra service was not found `
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
                message : "Error updating contract extra service with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a ContractExtraService with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ContractExtraService.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Contract extra service was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot delete Contract extra service with id=${id}. Maybe Contract extra service was not found!`
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
                message : "Could not delete service with id=" + id
              }
            }
          ]
        });
      });
  };
  exports.deleteMany = async (req, res) => {
    const ids = req.body.ids;
    let approve = true;
    ContractExtraService.destroy({
      where: { id: ids },
    })
      .then((num) => {
        if (num < ids.lenght) {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete all Extra Services. please refresh your page!`,
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
                message: `Cannot delete Extra Services. Maybe an Appointment was not found!`,
              },
            },
          ],
        });
        approve = false;
      });
    if (approve) {
      res.send({
        message: "Extra Services was deleted successufly!",
      });
    }
  };
  