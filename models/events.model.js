module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("event", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      coverImageFile: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    return Events;
  };


