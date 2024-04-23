module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {

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
    });
    return Service;
  };


