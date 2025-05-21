const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User')(sequelize);
db.Project = require('./Project')(sequelize);

module.exports = db;