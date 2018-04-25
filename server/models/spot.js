module.exports = function(sequelize, Sequelize) {
  const Spot = sequelize.define('spot', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    latitude: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Spot;
}