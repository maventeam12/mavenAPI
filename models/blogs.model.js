module.exports = (sequelize, Sequelize) => {
    const Blog = sequelize.define("blog", {
    id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageFile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
    });
    return Blog;
  };


