const { DataTypes } = require('sequelize');
const database = require('../db.config');
const Project = require('./Project');

const Task = database.define('task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  finishDate: {
    type: DataTypes.DATEONLY
  },
});

Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = Task;