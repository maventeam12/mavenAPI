module.exports = (sequelize, Sequelize) => {
    const ContractExtraService = sequelize.define("contractExtraService", {
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
      isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },

    });
    return ContractExtraService;
  };
  