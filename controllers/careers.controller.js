const db = require("../models");
const Career = db.career;
const Skill = db.skill;
const Responsability = db.responsability;
const Op = db.Sequelize.Op;

// Create and Save a new Career
exports.create = async (req, res) => {
  // Create a Career
  const career = {
    position: req.body.position,
    description: req.body.description,
  };
  const responsabilities = req.body.responsabilities || [];
  const skills = req.body.skills || [];
  // Save Career in the database
  Career.create(career)
    .then((data) => {
      try {
        responsabilities.forEach(async (element) => {
          await Responsability.create({
            careerId: data.id,
            description: element.description,
          });
        });
        skills.forEach(async (element) => {
          await Skill.create({
            careerId: data.id,
            description: element.description,
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
              message:
                "Some error occurred while creating the career please try again.",
            },
          },
        ],
      });
    });
};

// Retrieve all careers from the database.
exports.findAll = (req, res) => {
  Career.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message: "Some error occurred while retrieving Careers.",
            },
          },
        ],
      });
    });
};

// Find a single Career with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  const responsabilities = [];
  const skills = [];
  const resp = await Responsability.findAll({
    where: {
      careerId: id,
    },
  });
  resp.forEach((element) => {
    responsabilities.push({ description: element.dataValues.description });
  });
  const skill = await Skill.findAll({
    where: {
      careerId: id,
    },
  });
  skill.forEach((element) => {
    skills.push({ description: element.dataValues.description });
  });
  Career.findByPk(id)
    .then((data) => {
      if (data) {
        data.dataValues.responsabilities = responsabilities;
        data.dataValues.skills = skills;
        res.send(data);
      } else {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot find Career with id=${id}.`,
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
              message: "Error retrieving Career with id=" + id,
            },
          },
        ],
      });
    });
};

// Update a Career by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const career = {};
  if (req?.body?.description) {
    career.description = req.body.description;
  }
  if (req?.body?.position) {
    career.position = req.body.position;
  }
  Career.update(career, {
    where: { id: id },
  })
    .then((num) => {
      try {
        Responsability.destroy({
          where: { careerId: id },
        });
        Skill.destroy({
          where: { careerId: id },
        });
      } catch (error) {}
      const responsabilities = req.body.responsabilities || [];
      const skills = req.body.skills || [];
      try {
        responsabilities.forEach(async (element) => {
          await Responsability.create({
            careerId: id,
            description: element.description,
          });
        });
        skills.forEach(async (element) => {
          await Skill.create({
            careerId: id,
            description: element.description,
          });
        });
      } catch (error) {}

      if (num == 1) {
        res.send({
          message: "Career was updated successfully.",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot update Career with id=${id}. Maybe Career was not found or req.body is empty!`,
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
              message: "Error updating Career with id=" + id,
            },
          },
        ],
      });
    });
};

// Delete a Career with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Career.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        try {
          Responsability.destroy({
            where: { careerId: id },
          });
          Skill.destroy({
            where: { careerId: id },
          });
        } catch (error) {}
        res.send({
          message: "Career was deleted successfully!",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot delete Career with id=${id}. Maybe Career was not found!`,
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
              message: "Could not delete Career with id=" + id,
            },
          },
        ],
      });
    });
};
exports.deleteMany = (req, res) => {
  const ids = req.body.ids;
  Career.destroy({
    where: { id: ids },
  })
    .then((num) => {
      if (num >= 1) {
        ids.forEach((element) => {
          try {
            Responsability.destroy({
              where: { careerId: element },
            });
            Skill.destroy({
              where: { careerId: element },
            });
          } catch (error) {}
        });
        res.send({
          message: "Careers was deleted successfully!",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot delete Careers. Maybe a Service was not found!`,
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
              message: "Could not delete Careers",
            },
          },
        ],
      });
    });
};
