const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Personne = sequelize.define('Personne', {
  persID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_naissance: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  tableName: 'Personne',
  timestamps: false,
});

module.exports = Personne;
