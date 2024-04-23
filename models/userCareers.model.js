module.exports = (sequelize, Sequelize) => {
    const UserCareer = sequelize.define("userCareer", {
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
      career: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
              msg: "Must be a valid email address",
            }
          }
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      cvFile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isChecked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
    });
    return UserCareer;
  };


