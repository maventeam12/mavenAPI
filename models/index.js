const dbConfig = require("../config/mysqlConfig.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//model import
const service = require("./service.model.js")(sequelize, Sequelize);
const appointment = require("./appointments.model.js")(sequelize, Sequelize)
const tutorial = require("./tutorial.model.js")(sequelize, Sequelize);
const career = require("./careers.model.js")(sequelize, Sequelize);
const responsability = require("./responsabilities.model.js")(sequelize, Sequelize);
const skill = require("./skills.model.js")(sequelize, Sequelize);
const userCareer = require("./userCareers.model.js")(sequelize, Sequelize);
const event = require("./events.model.js")(sequelize, Sequelize);
const eventPhotography = require("./eventPhotographies.model.js")(sequelize, Sequelize);
const client = require("./clients.model.js")(sequelize, Sequelize);
const contract = require("./contract.model.js")(sequelize, Sequelize);
const contractDetail = require("./contractDetails.model.js")(sequelize, Sequelize);
const contractService = require("./contractServices.model.js")(sequelize, Sequelize);
const contractExtraService = require("./contractExtraService.model.js")(sequelize, Sequelize);
const clientMessage = require("./clientMessage.model.js")(sequelize, Sequelize);
const companyUser = require("./companyUsers.model.js")(sequelize, Sequelize);
const blog = require("./blogs.model.js")(sequelize, Sequelize);
const loginRegister = require("./loginRegister.model.js")(sequelize, Sequelize);
const contractServiceMonth = require("./contractServicesMonth.model.js")(sequelize, Sequelize);
const contractMessage = require("./contractMessage.model.js")(sequelize, Sequelize);
// connect models to db 
db.tutorials = tutorial
db.service = service
db.appointment = appointment
db.career = career
db.responsability = responsability
db.skill = skill
db.userCareer = userCareer
db.event = event
db.eventPhotography = eventPhotography
db.client = client
db.contract = contract
db.contractDetail = contractDetail
db.contractService = contractService
db.contractExtraService = contractExtraService
db.clientMessage = clientMessage
db.companyUser = companyUser
db.blog = blog
db.loginRegister = loginRegister
db.contractServiceMonth = contractServiceMonth
db.contractMessage = contractMessage

// one to many relations
db.career.hasMany(responsability, {foreignKey: 'careerId', onDelete: 'cascade', onUpdate: 'cascade'});
db.responsability.belongsTo(career, {foreignKey: 'careerId', onDelete: 'cascade', onUpdate: 'cascade'});

db.career.hasMany(skill, {foreignKey: 'careerId', onDelete: 'cascade', onUpdate: 'cascade'});
db.skill.belongsTo(career, {foreignKey: 'careerId', onDelete: 'cascade', onUpdate: 'cascade'});

db.event.hasMany(eventPhotography, {foreignKey: 'eventId', onDelete: 'cascade', onUpdate: 'cascade'});
db.eventPhotography.belongsTo(event, {foreignKey: 'eventId', onDelete: 'cascade', onUpdate: 'cascade'});

db.client.hasMany(clientMessage, {foreignKey: 'clientId', onDelete: 'cascade', onUpdate: 'cascade'});
db.clientMessage.belongsTo(client, {foreignKey: 'clientId', onDelete: 'cascade', onUpdate: 'cascade'});

db.client.hasMany(contract, {foreignKey: 'clientId', onDelete: 'cascade', onUpdate: 'cascade'});
db.contract.belongsTo(client, {foreignKey: 'clientId', onDelete: 'cascade', onUpdate: 'cascade'});

db.contract.hasMany(contractDetail, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});
db.contractDetail.belongsTo(contract, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});

db.contract.hasMany(contractService, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});
db.contractService.belongsTo(contract, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});

db.contract.hasMany(contractExtraService, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});
db.contractExtraService.belongsTo(contract, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});

db.contract.hasMany(contractServiceMonth, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});
db.contractServiceMonth.belongsTo(contract, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});

db.contract.hasMany(contractMessage, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});
db.contractMessage.belongsTo(contract, {foreignKey: 'contractId', onDelete: 'cascade', onUpdate: 'cascade'});

module.exports = db;
      