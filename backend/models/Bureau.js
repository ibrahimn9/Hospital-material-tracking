const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bureau = sequelize.define('Bureau', {
    bureauID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bureauName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    servID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'servID'
      }
    }
  });
  
module.exports = Bureau