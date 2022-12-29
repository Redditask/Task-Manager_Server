const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
});

const Task = sequelize.define("task", {
    id: {type: DataTypes.STRING, primaryKey: true, unique: true},
    taskText: {type: DataTypes.STRING},
    year: {type: DataTypes.INTEGER},
    month: {type: DataTypes.INTEGER},
    day: {type: DataTypes.INTEGER},
    startTime: {type: DataTypes.JSON},
    endTime: {type: DataTypes.JSON},
    color: {type: DataTypes.STRING},
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
  User,
  Task,
};
