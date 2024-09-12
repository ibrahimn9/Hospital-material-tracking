const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Compte = sequelize.define('Compte', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Type',
      key: 'typeID',
    },
  },
  persID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Personne',
      key: 'persID',
    },
  },
}, {
  tableName: 'Compte',
  timestamps: false,
});

module.exports = Compte;
