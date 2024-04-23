module.exports = (sequelize, Sequelize) => {
    const LoginRegister = sequelize.define("loginRegister", {
    id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
           
          },
      user: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      time: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      
    });
    return LoginRegister;
  };


