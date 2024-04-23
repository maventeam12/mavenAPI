const db = require("../models");
const fs = require("fs");
const EventPhotography = db.eventPhotography;
const Op = db.Sequelize.Op;

// Create and Save a new EventPhotography
exports.create = (req, res) => {
  const eventPhotography = {
    eventId: req.body.eventId,
    imageFile: req.file.path,
  };
  // Save UserCareer in the database
  EventPhotography.create(eventPhotography)
    .then((data) => {
      //implement here the saving of the file after copy the path in the db
      res.send(data);
    })
    .catch((err) => {
      if (req?.file?.path) {
        fs.unlinkSync(req.file.path);
      }
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message:
                "Some error occurred while creating the event photography.",
            },
          },
        ],
      });
    });
};

// Update a EventPhotography by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const event = {};

  if (req?.body?.eventId) {
    event.eventId = req.body.eventId;
  }
  if (req?.file?.path) {
    event.imageFile = req.file.path;
    try {
      const oldValue = await EventPhotography.findByPk(id);
      if (oldValue.dataValues.imageFile) {
        fs.unlinkSync(oldValue.dataValues.imageFile);
      }
    } catch (error) {}
  }
  if (req?.body?.imageFile === "" && !req?.file?.path) {
    event.imageFile = req.body.imageFile;
    const oldValue = await EventPhotography.findByPk(id);
    if (oldValue.dataValues.imageFile) {
      fs.unlinkSync(oldValue.dataValues.imageFile);
    }
  }
  EventPhotography.update(event, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event Photography was updated successfully.",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot update Event Photography with id=${id}. Maybe Event Photography was not found or req.body is empty!`,
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
              message: "Error updating Event Photography with id=" + id,
            },
          },
        ],
      });
    });
};

// Retrieve all EventPhotography from the database.
exports.findAll = (req, res) => {
  EventPhotography.findAll(
    {
      order: [["id", "DESC"]],
      include: [
        {
          model: db.event,
          attributes: ["name"], // Assuming client name is stored in 'name' field, adjust accordingly
          required: true, // Optional, depending on your requirements
        },
      ],
    },
    { raw: true }
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message:
                "Some error occurred while retrieving Event Photography.",
            },
          },
        ],
      });
    });
};

// Find  all EventPhotography for an event with an id
exports.findAllInEvent = (req, res) => {
  const id = req.params.id;

  EventPhotography.findAll({
    where: {
      eventId: id,
    },
    order: [["id", "DESC"]],
    include: [
      {
        model: db.event,
        attributes: ["name"], // Assuming client name is stored in 'name' field, adjust accordingly
        required: true, // Optional, depending on your requirements
      },
    ],
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
                message: `Cannot find event with id=${id}.`,
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
              message: "Error retrieving event with id=" + id,
            },
          },
        ],
      });
    });
};

// Find a single EventPhotography with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  EventPhotography.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot find event photography solicitud with id=${id}.`,
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
              message: "Error retrieving Event Photography with id=" + id,
            },
          },
        ],
      });
    });
};

// Delete a EventPhotography with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const photodata = await EventPhotography.findOne({
      where: { id: id },
    });
    EventPhotography.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          if (photodata.dataValues.imageFile) {
            fs.unlinkSync(photodata.dataValues.imageFile);
          }
          res.send({
            message: "Event Photography was deleted successfully!",
          });
        } else {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete Event Photography with id=${id}. Maybe Event Photography was not found!`,
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
                message: "Could not delete Event Photography with id=" + id,
              },
            },
          ],
        });
      });
  } catch (err) {
    res.send({
      error: [
        {
          value: "",
          msg: {
            message: `Cannot delete Event Photography with id=${id}. Maybe Event Photography was not found!`,
          },
        },
      ],
    });
  }
};

exports.deleteMany = async (req, res) => {
  const ids = req.body.ids;
  let approve = true;
  ids.forEach(async (id) => {
    EventPhotography.findOne({
      where: { id: id },
    })
      .then((data) => {
        EventPhotography.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num != 1) {
              res.send({
                error: [
                  {
                    value: "",
                    msg: {
                      message: `Cannot delete all Photographies. please refresh your page!`,
                    },
                  },
                ],
              });
              approve = false;
              return;
            }
            if(data.dataValues.imageFile){
              fs.unlinkSync(data.dataValues.imageFile);
            }
          })
          .catch((err) => {
            res.send({
              error: [
                {
                  value: "",
                  msg: {
                    message: `Cannot delete Photographies. Maybe an Event was not found!`,
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
                message: `Cannot delete Photographies. Maybe an Event was not found!`,
              },
            },
          ],
        });
        approve = false;
      });
  });
  if (approve) {
    res.send({
      message: "Photographies was deleted successufly!",
    });
  }
};
