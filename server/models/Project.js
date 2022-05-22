const { DataTypes } = require('sequelize');
const database = require('../config/db.config');
const User = require('./User');

const Project = database.define('project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.hasMany(Project);
Project.belongsTo(User);

module.exports = Project;