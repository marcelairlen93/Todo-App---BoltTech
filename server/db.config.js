const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/postgres', { dialect: 'postgres' });

module.exports = sequelize;