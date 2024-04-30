
const db = require("../models");
const ContractService = db.contractService;
const Op = db.Sequelize.Op;

// Create and Save a new ContractService
exports.create = (req, res) => {
    // Create a ContractService
    const contractService = {
    serviceName: req.body.serviceName,
    quantity: req.body.quantity,
    isActive : req.body.isActive,
    contractId: req.body.contractId,
    };
  
    // Save ContractDetail in the database
    ContractService.create(contractService)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating contract service."
              }
            }
          ]
        });
      });
  };

// Retrieve all ContractService from the database.
exports.findAll = (req, res) => {
  
    ContractService.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error:[
            {
              value : "",
              msg : {
                message : "Some error occurred while retrieving Contract service."
              }
            }
          ]
        });
      });
  };

// Find  all Contract Detail for an carrer with an id
exports.findAllInContract = (req, res) => {
    const id = req.params.id;
  
    ContractService.findAll({
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
        res.status(500).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Error retrieving services"
              }
            }
          ]
        });
      });
  };

// Find a single ContractService with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ContractService.findByPk(id)
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
        res.status(500).send({
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

// Update a ContractService by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const service = {};
    if(req?.body?.serviceName){
        service.serviceName = req.body.serviceName
      }
      if(req?.body?.quantity){
        service.quantity = req.body.quantity
      }
      if(req?.body?.isActive == true || req?.body?.isActive == false){
        service.isActive = req.body.isActive
      }
      if(req?.body?.contractId){
        service.contractId = req.body.contractId
      }

      ContractService.update(service, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "contract service was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message :  `Cannot update contract service with id=${id}. Maybe contract service was not found `
                }
              }
            ]
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          error:[
            {
              value : "",
              msg : {
                message : "Error updating contract service with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a ContractService with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ContractService.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Contract service was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot delete Contract service with id=${id}. Maybe Contract service was not found!`
                }
              }
            ]
          });
        }
      })
      .catch(err => {
        res.status(500).send({
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