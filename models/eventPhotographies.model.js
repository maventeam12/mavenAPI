module.exports = (sequelize, Sequelize) => {
    const EventPhotography = sequelize.define("eventPhotography", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      imageFile: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
    return EventPhotography;
  };


