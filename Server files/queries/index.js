const Sequelize = require('sequelize');
const dbConfig = require('./dbconfig');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
});

const db = {};
db.sequelize = sequelize;
db.models = {};

module.exports = db;