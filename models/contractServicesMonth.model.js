module.exports = (sequelize, Sequelize) => {
    const ContractServiceMonth = sequelize.define("contractServiceMonth", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      serviceName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      month: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    });
    return ContractServiceMonth;
  };
  