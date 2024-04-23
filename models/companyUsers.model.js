module.exports = (sequelize, Sequelize) => {
    const CompanyUser = sequelize.define("companyUser", {
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
        allowNull: true,
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
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
      },
      
    });
    return CompanyUser;
  };


