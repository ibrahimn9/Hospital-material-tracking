const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Structure = sequelize.define("Structures", {
  structureID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  structureName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Structure
