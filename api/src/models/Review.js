const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('review', {
    stars: {
      type: DataTypes.ENUM("0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"),
      allowNull: false,
      notEmpty: true,
      get() {
        return Number(this.getDataValue("stars"));
      },
    },
    title: {
      type: DataTypes.STRING(150)
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      notEmpty: true,
    },

  });
};