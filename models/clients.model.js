module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
    id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
              msg: "Must be a valid email address",
            }
          }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      logoFile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isImportant: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      
    });
    return Client;
  };


