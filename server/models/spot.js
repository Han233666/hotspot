module.exports = function(sequelize, Sequelize) {
  const Spot = sequelize.define('spot', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.TEXT,
      notEmpty: true
    },
    title: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    description: {
      type: Sequelize.TEXT,
    },
    latitude: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    longitude: {
      type: Sequelize.STRING,
      notEmpty: true
    },
  });
  return Spot;
}