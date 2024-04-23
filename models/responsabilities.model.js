module.exports = (sequelize, Sequelize) => {
    const Responsability = sequelize.define("responsability", {
    id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    return Responsability;
  };


