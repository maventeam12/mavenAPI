const { encrypt } = require("../helpers/handlePassword");
const db = require("../models");
const Blog = db.blog;
const Op = db.Sequelize.Op;
const fs = require("fs");

// Create and Save a new Blog
exports.create = async (req, res) => {
  // Create a Blog
  const blog = {
    description: req.body.description,
    title: req.body.title,
    content: req.body.content,
    imageFile: req?.file?.path || "",
  };

  // Save Blog in the database
  Blog.create(blog)
    .then((data) => {
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
              message: "Some error occurred while creating Blog.",
            },
          },
        ],
      });
    });
};

// Retrieve all Blog from the database.
exports.findAll = (req, res) => {
  Blog.findAll({
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
              message: "Some error occurred while retrieving Blog.",
            },
          },
        ],
      });
    });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot find Blog with id=${id}.`,
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
              message: "Error retrieving Blog with id=" + id,
            },
          },
        ],
      });
    });
};

// Update a Blog by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const blog = {};
  if (req?.body?.description) {
    blog.description = req.body.description;
  }
  if (req?.body?.title) {
    blog.title = req.body.title;
  }
  if (req?.body?.content) {
    blog.content = req.body.content;
  }
  if (req?.file?.path) {
    blog.imageFile = req.file.path;
    try {
      const oldValue = await Blog.findByPk(id);
      if(oldValue.dataValues.imageFile){

        fs.unlinkSync(oldValue.dataValues.imageFile);
      }
    } catch (error) {}
  }
  if (req?.body?.imageFile === "" && !req?.file?.path) {
    blog.imageFile = req.body.imageFile;
    const oldValue = await Blog.findByPk(id);
    if (oldValue.dataValues.imageFile) { 
      fs.unlinkSync(oldValue.dataValues.imageFile);
    }
  }
  Blog.update(blog, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Blog was updated successfully.",
        });
      } else {
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `Cannot update Blog with id=${id}. Maybe Blog was not found or req.body is empty!`,
              },
            },
          ],
        });
      }
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
              message: "Error updating Blog with id=" + id,
            },
          },
        ],
      });
    });
};

// Delete a Blog with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const blogData =   await Blog.findOne({
      where: { id: id },
    });
    Blog.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          if(blogData.dataValues.imageFile){
            fs.unlinkSync(blogData.dataValues.imageFile);
          } 
          res.send({
            message: "Blog was deleted successfully!",
          });
        } else {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`,
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
                message: "Could not delete Blog with id=" + id,
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
            message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`,
          },
        },
      ],
    });
  }

};

exports.deleteMany = (req, res) => {
  const ids = req.body.ids;
  let approve = true;
  ids.forEach(async (id) => {
    Blog.findOne({
      where: { id: id },
    })
      .then((data) => {
        Blog.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num != 1) {
              res.send({
                error: [
                  {
                    value: "",
                    msg: {
                      message: `Cannot delete Blogs. please refresh your page!`,
                    },
                  },
                ],
              });
              approve = false;
              return
            }
            if(data.dataValues.imageFile){
              fs.unlinkSync(data.dataValues.imageFile);
            }
          })
          .catch((err) => {
            res.status(200).send({
              error: [
                {
                  value: "",
                  msg: {
                    message: "Could not delete Blogs",
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
                message: `Cannot delete Blogs. please refresh your page!`,
              },
            },
          ],
        });
      });
  });
  if (approve) {
    res.send({
      message: "Blogs was deleted successufly!",
    });
  }
};
