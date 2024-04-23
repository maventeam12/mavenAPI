module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("contract", {
    id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      linkToDrive: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      months: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
    });
    return Contract;
  };


