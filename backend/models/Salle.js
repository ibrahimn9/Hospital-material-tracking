const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Salle = sequelize.define("Salle", {
  salleID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  salleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bureauID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "bureaus",
      key: "bureauID",
    },
  },

});

module.exports = Salle;
