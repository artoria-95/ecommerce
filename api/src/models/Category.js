const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isAlphanumeric: true, // <--- Alfanumericos solamente.
      notEmpty: true   // <-- No permite Strings vacíos.


    },
    description: {
      type: DataTypes.TEXT,
    }
  });
};