const Sequelize = require('sequelize');
const connection = require("./database");

const Games = connection.define('games',{
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Games.sync({ force: false }).then(() => {});

module.exports = Games;
