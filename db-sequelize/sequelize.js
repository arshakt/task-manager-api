const Sequelize = require('sequelize');

const UserModel = require('../models/users-model');
const TaskModel = require('../models/tasks-model');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize);
const Task = TaskModel(sequelize, Sequelize);

sequelize.sync({force: false})
  .then(() => {
    console.log(`Database & tables created!`)
  });

module.exports = {
  User,
  Task
};
