const db = require("../models");
const Contract = db.contract;
const ContractDetail = db.contractDetail;
const ContractService = db.contractService;
const contractServiceMonth = db.contractServiceMonth;
const contractMessage = db.contractMessage;
const contractClientExtraService = db.contractExtraService;
const Op = db.Sequelize.Op;

// Create and Save a new Contract
exports.create = (req, res) => {
  const contract = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    linkToDrive: req.body.linkToDrive,
    clientId: req.body.clientId,
    months: req.body.months,
    title: req.body.title,
  };
  const details = req.body.details || [];
  const services = req.body.services || [];
  const servicesMonth = req.body.servicesMonth || [];
  const contractMsg = req.body.contractMsg || [];
  // Save Contract in the database
  Contract.create(contract)
    .then((data) => {
      try {
        details.forEach(async (element) => {
          await ContractDetail.create({
            contractId: data.id,
            serviceName: element.serviceName,
            quantity: element.quantity || 0,
            delivered: element.delivered || 0,
            extra: element.extra || 0,
            month: element.month || " ",
          });
        });
        services.forEach(async (element) => {
          await ContractService.create({
            contractId: data.id,
            serviceName: element.serviceName || " ",
            quantity: element.quantity || 0,
          });
        });
        servicesMonth.forEach(async (element) => {
          await contractServiceMonth.create({
            contractId: data.id,
            serviceName: element.serviceName || " ",
            month: element.month || " ",
            quantity: element.quantity || 0,
          });
        });
        contractMsg.forEach(async (element) => {
          await contractMessage.create({
            contractId: data.id,
            message: element.message || " ",
            urgent: element.urgent || 0,
          });
        });
      } catch (error) {}

      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message: "Some error occurred while creating the Contract.",
            },
          },
        ],
      });
    });
};

// Update a Contract by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const contract = {};
  if (req?.body?.startDate) {
    contract.startDate = req.body.startDate;
  }
  if (req?.body?.endDate) {
    contract.endDate = req.body.endDate;
  }
  if (req?.body?.linkToDrive) {
    contract.linkToDrive = req.body.linkToDrive;
  }
  if (req?.body?.clientId) {
    contract.clientId = req.body.clientId;
  }
  if (req?.body?.months) {
    contract.months = req.body.months;
  }
  if (req?.body?.title) {
    contract.title = req.body.title;
  }
  Contract.update(contract, {
    where: { id: id },
  })
    .then((num) => {
      try {
        ContractDetail.destroy({
          where: { contractId: id },
        });
        ContractService.destroy({
          where: { contractId: id },
        });
        contractServiceMonth.destroy({
          where: { contractId: id },
        });
        contractMessage.destroy({
          where: { contractId: id },
        });
      } catch (error) {}
      const details = req.body.details || [];
      const services = req.body.services || [];
      const servicesMonth = req.body.servicesMonth || [];
      const contractMsg = req.body.contractMsg || [];
      try {
        details.forEach(async (element) => {
          await ContractDetail.create({
            contractId: id,
            serviceName: element.serviceName,
            quantity: element.quantity || 0,
            delivered: element.delivered || 0,
            extra: element.extra || 0,
            month: element.month || " ",
          });
        });
        services.forEach(async (element) => {
          await ContractService.create({
            contractId: id,
            serviceName: element.serviceName,
            quantity: element.quantity || 0,
          });
        });
        servicesMonth.forEach(async (element) => {
          await contractServiceMonth.create({
            contractId: id,
            serviceName: element.serviceName,
            quantity: element.quantity || 0,
            month: element.month || " ",
          });
        });
        contractMsg.forEach(async (element) => {
          await contractMessage.create({
            contractId: id,
            message: element.message || " ",
            urgent: element.urgent || 0,
          });
        });
      } catch (error) {}
      if (num == 1) {
        res.send({
          message: "contract was updated successfully.",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot update contract with id=${id}.`,
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
              message: "Error updating contract  with id=" + id,
            },
          },
        ],
      });
    });
};

// Retrieve all contract from the database.
exports.findAll = (req, res) => {
  Contract.findAll(
    {
      include: [
        {
          model: db.client,
          attributes: ["name"], // Assuming client name is stored in 'name' field, adjust accordingly
          required: true, // Optional, depending on your requirements
        },
      ],
    },
    { raw: true }
  )
    .then((data) => {
      data.forEach((element) => {
        element.dataValues.clientId = element.dataValues.client.dataValues.name;
      });
      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message: "Some error occurred while retrieving contracts.",
            },
          },
        ],
      });
    });
};

// Find  all contract for an contract with an id
exports.findAllForClient = (req, res) => {
  const id = req.params.id;

  Contract.findAll({
    where: {
      clientId: id,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot find client contracts with id=${id}.`,
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
              message: "Error retrieving client with id=" + id,
            },
          },
        ],
      });
    });
};

// Find a single contract with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  const details = [];
  const services = [];
  const servicesMonth = [];
  const contractMsg = [];
  const contractExtService = [];

  const ext = await contractClientExtraService.findAll({
    where: {
      contractId: id,
    },
  });
  ext.forEach((element) => {
    contractExtService.push({
      serviceName: element.dataValues.serviceName,
    });
  });
  const msg = await contractMessage.findAll({
    where: {
      contractId: id,
    },
  });
  msg.forEach((element) => {
    contractMsg.push({
      message: element.dataValues.message,
      urgent: element.dataValues.urgent,
    });
  });

  const mon = await contractServiceMonth.findAll({
    where: {
      contractId: id,
    },
  });
  mon.forEach((element) => {
    servicesMonth.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      month: element.dataValues.month,
    });
  });

  const det = await ContractDetail.findAll({
    where: {
      contractId: id,
    },
  });
  det.forEach((element) => {
    details.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });
  const ser = await ContractService.findAll({
    where: {
      contractId: id,
    },
  });
  ser.forEach((element) => {
    services.push({
      serviceName: element.dataValues.serviceName,
      isActive: element.dataValues.isActive,
      quantity: element.dataValues.quantity,
    });
  });

  Contract.findByPk(id)
    .then((data) => {
      if (data) {
        data.dataValues.details = details;
        data.dataValues.services = services;
        data.dataValues.servicesMonth = servicesMonth;
        data.dataValues.contractMsg = contractMsg;
        data.dataValues.contractExtService = contractExtService;
        res.send(data);
      } else {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot find Contract solicitud with id=${id}.`,
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
              message: "Error retrieving Contract with id=" + id,
            },
          },
        ],
      });
    });
};

// Delete a Contract with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contract.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        try {
          ContractDetail.destroy({
            where: { contractId: id },
          });
          ContractService.destroy({
            where: { contractId: id },
          });
          contractServiceMonth.destroy({
            where: { contractId: id },
          });
          contractMessage.destroy({
            where: { contractId: id },
          });
        } catch (error) {}
        res.send({
          message: "Contract was deleted successfully!",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot delete Contract with id=${id}. Maybe Contract was not found!`,
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
              message: "Could not delete Contract with id=" + id,
            },
          },
        ],
      });
    });
};

// Find a single contract with an id
exports.findOneForBill = async (req, res) => {
  const id = req.params.id;
  const details = [];
  const services = [];
  const servicesMonth = [];
  const contractMsg = [];

  const january = [];
  const february = [];
  const march = [];
  const april = [];
  const may = [];
  const june = [];
  const july = [];
  const august = [];
  const september = [];
  const october = [];
  const november = [];
  const december = [];

  const januaryService = [];
  const februaryService = [];
  const marchService = [];
  const aprilService = [];
  const mayService = [];
  const juneService = [];
  const julyService = [];
  const augustService = [];
  const septemberService = [];
  const octoberService = [];
  const novemberService = [];
  const decemberService = [];

  const jan = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "1",
    },
  });
  jan.forEach((element) => {
    january.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const feb = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "2",
    },
  });
  feb.forEach((element) => {
    february.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const mar = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "3",
    },
  });
  mar.forEach((element) => {
    march.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const apr = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "4",
    },
  });
  apr.forEach((element) => {
    april.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const ma = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "5",
    },
  });
  ma.forEach((element) => {
    may.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const jun = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "6",
    },
  });
  jun.forEach((element) => {
    june.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const jul = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "7",
    },
  });
  jul.forEach((element) => {
    july.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const aug = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "8",
    },
  });
  aug.forEach((element) => {
    august.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const sep = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "9",
    },
  });
  sep.forEach((element) => {
    september.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const oct = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "10",
    },
  });
  oct.forEach((element) => {
    october.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const nov = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "11",
    },
  });
  nov.forEach((element) => {
    november.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const dec = await ContractDetail.findAll({
    where: {
      contractId: id,
      month: "12",
    },
  });
  dec.forEach((element) => {
    december.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const janService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "1",
    },
  });
  janService.forEach((element) => {
    januaryService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const febService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "2",
    },
  });
  febService.forEach((element) => {
    februaryService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const marService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "3",
    },
  });
  marService.forEach((element) => {
    marchService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const aprService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "4",
    },
  });
  aprService.forEach((element) => {
    aprilService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const maService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "5",
    },
  });
  maService.forEach((element) => {
    mayService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const junService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "6",
    },
  });
  junService.forEach((element) => {
    juneService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const julService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "7",
    },
  });
  julService.forEach((element) => {
    julyService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const augService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "8",
    },
  });
  augService.forEach((element) => {
    augustService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const sepService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "9",
    },
  });
  sepService.forEach((element) => {
    septemberService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const octService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "10",
    },
  });
  octService.forEach((element) => {
    octoberService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const novService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "11",
    },
  });
  novService.forEach((element) => {
    novemberService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const decService = await contractServiceMonth.findAll({
    where: {
      contractId: id,
      month: "12",
    },
  });
  decService.forEach((element) => {
    decemberService.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });

  const mon = await contractServiceMonth.findAll({
    where: {
      contractId: id,
    },
  });
  mon.forEach((element) => {
    servicesMonth.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      month: element.dataValues.month,
    });
  });

  const det = await ContractDetail.findAll({
    where: {
      contractId: id,
    },
  });
  det.forEach((element) => {
    details.push({
      serviceName: element.dataValues.serviceName,
      quantity: element.dataValues.quantity,
      delivered: element.dataValues.delivered,
      extra: element.dataValues.extra,
      month: element.dataValues.month,
    });
  });
  const ser = await ContractService.findAll({
    where: {
      contractId: id,
    },
  });
  ser.forEach((element) => {
    services.push({
      serviceName: element.dataValues.serviceName,
      isActive: element.dataValues.isActive,
      quantity: element.dataValues.quantity,
    });
  });
  const msg = await contractMessage.findAll({
    where: {
      contractId: id,
    },
  });
  msg.forEach((element) => {
    contractMsg.push({
      message: element.dataValues.message,
      urgent: element.dataValues.urgent,
    });
  });

  Contract.findByPk(id)
    .then((data) => {
      if (data) {
        data.dataValues.details = details;
        data.dataValues.services = services;
        data.dataValues.servicesMonth = servicesMonth;
        data.dataValues.contractMsg = contractMsg;

        data.dataValues.january = january;
        data.dataValues.february = february;
        data.dataValues.march = march;
        data.dataValues.april = april;
        data.dataValues.may = may;
        data.dataValues.june = june;
        data.dataValues.july = july;
        data.dataValues.august = august;
        data.dataValues.september = september;
        data.dataValues.october = october;
        data.dataValues.november = november;
        data.dataValues.december = december;

        data.dataValues.januaryService = januaryService;
        data.dataValues.februaryService = februaryService;
        data.dataValues.marchService = marchService;
        data.dataValues.aprilService = aprilService;
        data.dataValues.mayService = mayService;
        data.dataValues.juneService = juneService;
        data.dataValues.julyService = julyService;
        data.dataValues.augustService = augustService;
        data.dataValues.septemberService = septemberService;
        data.dataValues.octoberService = octoberService;
        data.dataValues.novemberService = novemberService;
        data.dataValues.decemberService = decemberService;
        res.send(data);
      } else {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot find Contract solicitud with id=${id}.`,
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
              message: "Error retrieving Contract with id=" + id,
            },
          },
        ],
      });
    });
};
