module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define("appointment", {
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
      businessName: {
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
        validate: {
            isEmail: {
              msg: "Must be a valid email address",
            }
          }
      },
      message: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      service: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      
    });
    return Appointment;
  };


