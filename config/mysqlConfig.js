/*

pool: is optional, it will be used for Sequelize connection pool configuration:
max: maximum number of connection in pool
min: minimum number of connection in pool
idle: maximum time, in milliseconds, that a connection can be idle before being released
acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error

*/
module.exports = {
    HOST: "mysql.old.mavenevents.ae",
    USER: "mavenapi_dbuser",
    PASSWORD: 'Team@VPS',
    DB: "mysqlteam",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };