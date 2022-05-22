const Sequelize = require('sequelize');
const config = require("./config");

const sequelize = new Sequelize(`${config.DB_USER}://${config.DB_USER}@${config.DB_HOST}:5432/${config.DB_NAME}`, { dialect: `${config.DB_USER}` });

module.exports = sequelize;