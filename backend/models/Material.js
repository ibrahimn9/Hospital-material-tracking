const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Material = sequelize.define('Material', {
    materialID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    materialName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    respID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Compte', 
        key: 'userId'
      }
    },
    salleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'salles',
        key: 'salleID'
      }
    },
    model: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    stateID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'states',
        key: 'stateID'
      }
    }
  });

  
module.exports = Material