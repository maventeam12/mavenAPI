module.exports = (app) => {
  const blogs = require("../controllers/blogs.controller.js");
  var router = require("express").Router();
  // middlewares
  const uploadImage = require("../middleware/uploadBlogImage.js");
  const checkUser = require("../middleware/checkUser.js");
  const roles = require("../middleware/roles.js");
  const session = require("../middleware/session.js");
  const trimRequest = require("trim-request");
  const {
    validatorCreateBlog,
    validatorgetAndDeleteBlog,
    validatorupdateBlog,
    validatorDeleteManyBlogs,
  } = require("../validators/blogs.validator.js");
  // Create a new blogs

  router.post(
    "/",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    uploadImage,
    validatorCreateBlog,
    blogs.create
  );

  // Retrieve all blogs
  router.get("/", blogs.findAll);

  // Retrieve a single blogs with id
  router.get("/:id", validatorgetAndDeleteBlog, blogs.findOne);

  // Update a blogs with id
  router.put(
    "/:id",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    uploadImage,
    validatorgetAndDeleteBlog,
    validatorupdateBlog,
    blogs.update
  );

 
  router.delete(
    "/many",
    trimRequest.all,
    session,
    checkUser,
    roles(["employee", "admin"]),
    validatorDeleteManyBlogs,
    blogs.deleteMany
  );
 // Delete a blogs with id
 router.delete(
  "/:id",
  trimRequest.all,
  session,
  checkUser,
  roles(["employee", "admin"]),
  validatorgetAndDeleteBlog,
  blogs.delete
);
  app.use("/api/blog", router);
};
