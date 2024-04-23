module.exports = (sequelize, Sequelize) => {
    const ContractMessage = sequelize.define("contractMessage", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      urgent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
    });
    return ContractMessage;
  };
  