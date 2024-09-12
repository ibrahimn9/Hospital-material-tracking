const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Rapport = sequelize.define("Rapport", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idCompte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Compte",
      key: "userId",
    },
  },
  idDemande: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Demandes",
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATE,
  },
  context: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
});

module.exports = Rapport;
