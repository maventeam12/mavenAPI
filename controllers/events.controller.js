const db = require("../models");
const fs = require("fs");
const Event = db.event;
const EventPhotography = db.eventPhotography;
const Op = db.Sequelize.Op;
// Create and Save a new Event
exports.create = (req, res) => {
    const event = {
      name: req.body.name,
      description: req.body.description,
      coverImageFile: req?.file?.path|| "",
    };
    // Save Event in the database
    Event.create(event)
      .then((data) => {
        //implement here the saving of the file after copy the path in the db
        res.send(data);
      })
      .catch((err) => {
        if (req?.file?.path) {
          fs.unlinkSync(req?.file?.path);
        }
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: "Some error occurred while creating the Event .",
              },
            },
          ],
        });
      });

};

// Update a Event by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const event = {};
  if (req?.body?.name) {
    event.name = req.body.name;
  }
  if (req?.body?.description || req?.body?.description =='') {
    event.description = req.body.description;
  }
  if (req?.file?.path) {
    event.coverImageFile = req.file.path;
    try {
      const oldValue = await Event.findByPk(id);
      if(oldValue.dataValues.coverImageFile){

        fs.unlinkSync(oldValue.dataValues.coverImageFile);
      }
    } catch (error) {
    }
  }
  if (req?.body?.coverImageFile === "" && !req?.file?.path) {
    event.coverImageFile = req.body.coverImageFile;
    const oldValue = await Event.findByPk(id);
    if (oldValue.dataValues.coverImageFile) { 
      fs.unlinkSync(oldValue.dataValues.coverImageFile);
    }
  }
  Event.update(event, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
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
              message: "Error updating Event with id=" + id,
            },
          },
        ],
      });
    });
};

// Retrieve all Event from the database.
exports.findAll = (req, res) => {
  Event.findAll({
    order:[
      ['id','DESC']
    ]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message: "Some error occurred while retrieving Event.",
            },
          },
        ],
      });
    });
};

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot find Event with id=${id}.`,
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
              message: "Error retrieving Event with id=" + id,
            },
          },
        ],
      });
    });
};

// Delete a Event with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
try {
  const eventsPhotosData = await EventPhotography.findAll({
    where:{
      eventId: id
  },
  });
  eventsPhotosData.forEach(element => {
    EventPhotography.destroy({
      where: { id: element.dataValues.id }
    })
    if (element.dataValues.imageFile) {
      fs.unlinkSync(element.dataValues.imageFile);
    }
  });
  const eventData = await Event.findOne({
    where: { id: id },
  })
    Event.destroy({
      where: { id: id },
    })
      .then(async (num) => {
        if (num == 1) {
          if(eventData.dataValues.coverImageFile){
            fs.unlinkSync(eventData.dataValues.coverImageFile);
          } 
          res.send({
            message: "Event was deleted successfully!",
          });
        } else {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
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
                message: "error has accurade try refreshing the page!",
              },
            },
          ],
        });
      });
} catch (err) {
  res.status(200).send({
    error: [
      {
        value: "",
        msg: {
          message: "error has accurade try refreshing the page!",
        },
      },
    ],
  });
}
};
exports.deleteMany = async (req, res) => {
  const ids = req.body.ids;
  let approve = true;
try {
  ids.forEach(async (id) => {
            const eventsPhotosData = await EventPhotography.findAll({
              where:{
                eventId: id
            },
            });
            eventsPhotosData.forEach(element => {
              EventPhotography.destroy({
                where: { id: element.dataValues.id }
              })
          
              if (element.dataValues.imageFile) {
                fs.unlinkSync(element.dataValues.imageFile);
              }
            });
    Event.findOne({
      where: { id: id },
    })
      .then((data) => {
        Event.destroy({
          where: { id: id },
        })
          .then(async (num) => {
            if (num != 1) {
              res.send({
                error: [
                  {
                    value: "",
                    msg: {
                      message: `Cannot delete all Events. please refresh your page!`,
                    },
                  },
                ],
              });
              approve = false;
              return;
            }
            if(data.dataValues.coverImageFile){
              fs.unlinkSync(data.dataValues.coverImageFile);
            }
          })
          .catch((err) => {
            res.send({
              error: [
                {
                  value: "",
                  msg: {
                    message: `Cannot delete Events. Maybe an Event was not found!`,
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
                message: `Cannot delete Events. Maybe an Event was not found!`,
              },
            },
          ],
        });
        approve = false;
      });


     
  });
  if (approve) {
    res.send({
      message: "Events was deleted successufly!",
    });
  }
} catch (err) {
  res.send({
    error: [
      {
        value: "",
        msg: {
          message: `Cannot delete Events. Maybe an Event was not found!`,
        },
      },
    ],
  });
}
};
