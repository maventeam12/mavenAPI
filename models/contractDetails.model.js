module.exports = (sequelize, Sequelize) => {
  const ContractDetail = sequelize.define("contractDetail", {
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
    delivered: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    extra: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    month: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return ContractDetail;
};
