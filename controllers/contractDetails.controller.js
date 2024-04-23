
const db = require("../models");
const ContractDetail = db.contractDetail;
const Op = db.Sequelize.Op;

// Create and Save a new ContractDetail
exports.create = (req, res) => {
    // Create a ContractDetail
    const contractDetail = {
    serviceName: req.body.serviceName,
      quantity: req.body.quantity,
      delivered: req.body.delivered,
      extra: req.body.extra,
      month: req.body.month,
      contractId: req.body.contractId,
    };
  
    // Save ContractDetail in the database
    ContractDetail.create(contractDetail)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error:[
            {
              value : "",
              msg : {
                message :  "Some error occurred while creating contract Detail."
              }
            }
          ]
        });
      });
  };

// Retrieve all ContractDetails from the database.
exports.findAll = (req, res) => {
  
    ContractDetail.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error:[
            {
              value : "",
              msg : {
                message : "Some error occurred while retrieving Contract Details."
              }
            }
          ]
        });
      });
  };

// Find  all Contract Detail for an carrer with an id
exports.findAllInContract = (req, res) => {
    const id = req.params.id;
  
    ContractDetail.findAll({
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
                message :  "Error retrieving details"
              }
            }
          ]
        });
      });
  };

// Find a single ContractDetail with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    ContractDetail.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(200).send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot find detail with id=${id}.`
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
                message : "Error retrieving detail with id=" + id
              }
            }
          ]
        });
      });
  };

// Update a ContractDetail by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const detail = {};
    if(req?.body?.serviceName){
        detail.serviceName = req.body.serviceName
      }
      if(req?.body?.quantity){
        detail.quantity = req.body.quantity
      }
      if(req?.body?.delivered){
        detail.delivered = req.body.delivered
      }
      if(req?.body?.extra){
        detail.extra = req.body.extra
      }
      if(req?.body?.month){
        detail.month = req.body.month
      }
      if(req?.body?.contractId){
        detail.contractId = req.body.contractId
      }

    ContractDetail.update(detail, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "contract detail was updated successfully."
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message :  `Cannot update contract detail with id=${id}. Maybe contract detail was not found `
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
                message : "Error updating contract detail with id=" + id
              }
            }
          ]
        });
      });
  };

// Delete a ContractDetail with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    ContractDetail.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Contract Detail was deleted successfully!"
          });
        } else {
          res.send({
            error:[
              {
                value : "",
                msg : {
                  message : `Cannot delete Contract Detail with id=${id}. Maybe Contract Detail was not found!`
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
                message : "Could not delete detail with id=" + id
              }
            }
          ]
        });
      });
  };