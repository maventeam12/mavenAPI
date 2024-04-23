module.exports = (sequelize, Sequelize) => {
    const Career = sequelize.define("career", {
      id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
    });
    return Career;
  };


