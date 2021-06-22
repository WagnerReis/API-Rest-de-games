const Sequelize = require('sequelize');
const connection = require("./database");

const Game = connection.define('games',{
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

Game.sync({ force: false }).then(() => {});

module.exports = Game;
