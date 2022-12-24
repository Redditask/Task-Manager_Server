const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
});

const Task = sequelize.define("task", {
    id: {type: DataTypes.STRING, primaryKey: true, unique: true},
    taskData: {type: DataTypes.JSON},
});

User.hasMany(Task);
Task.belongsTo(User);

module.exports = {
  User,
  Task,
};
