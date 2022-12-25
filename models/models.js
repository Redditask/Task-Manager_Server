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
    startHour: {type: DataTypes.INTEGER},
    startMin: {type: DataTypes.INTEGER},
    endHour: {type: DataTypes.INTEGER},
    endMin: {type: DataTypes.INTEGER},
    color: {type: DataTypes.STRING},
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
  User,
  Task,
};
