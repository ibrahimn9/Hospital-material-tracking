const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Demande = sequelize.define("Demande", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idCompte: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Compte",
      key: "userId",
    },
  },
  date: {
    type: DataTypes.DATE,
  },
  type: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  remarque: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  decision: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Demande;
