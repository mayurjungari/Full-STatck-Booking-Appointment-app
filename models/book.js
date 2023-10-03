const Sequelize = require('sequelize');

const sequelize = new Sequelize('Node_complete', 'root', 'Mayur@123', {
  host: 'localhost',
  dialect: 'mysql', 
});

const Appointment = sequelize.define('bookings', {
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Appointment, sequelize };
