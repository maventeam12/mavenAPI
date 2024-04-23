module.exports = (sequelize, Sequelize) => {
    const ContractService = sequelize.define("contractService", {
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
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

    });
    return ContractService;
  };
  