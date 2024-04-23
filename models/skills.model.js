module.exports = (sequelize, Sequelize) => {
    const Skills = sequelize.define("skill", {
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
    return Skills;
  };


