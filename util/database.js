const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('Node_complete', 'root', 'Mayur@123', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
