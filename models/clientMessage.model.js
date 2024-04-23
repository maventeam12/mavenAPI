module.exports = (sequelize, Sequelize) => {
  const ClientMessage = sequelize.define("clientMessage", {
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
  });
  return ClientMessage;
};
