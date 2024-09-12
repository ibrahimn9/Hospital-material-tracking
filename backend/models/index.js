const { Sequelize } = require("sequelize");
const Compte = require("./Compte");
const Personne = require("./Personne");
const Type = require("./Type");
const Permission = require("./Permission");
const Material = require("./Material");
const Salle = require("./Salle");
const Bureau = require("./Bureau");
const Service = require("./Service");
const State = require("./State");
const Structure = require("./Structure");
const Demande = require("./Demande");
const Rapport = require("./Rapport");
const sequelize = require("../config/database");

// Define relationships
Compte.belongsTo(Personne, { foreignKey: "persID" });
Compte.belongsTo(Type, { foreignKey: "typeID" });

Type.belongsToMany(Permission, {
  through: "Type_permission",
  foreignKey: "typeID",
});
Permission.belongsToMany(Type, {
  through: "Type_permission",
  foreignKey: "permID",
});

Material.belongsTo(Salle, { foreignKey: "salleID" });
Material.belongsTo(State, { foreignKey: "stateID" });
Material.belongsTo(Compte, { foreignKey: "respID" });

State.hasMany(Material, { foreignKey: "stateID" });

Salle.belongsTo(Bureau, { foreignKey: "bureauID" });

Bureau.belongsTo(Service, { foreignKey: "servID" });

Service.belongsTo(Structure, { foreignKey: "structureID" });

Rapport.belongsTo(Demande, { foreignKey: "idDemande" });
Rapport.belongsTo(Compte, { foreignKey: "idCompte" });

Demande.belongsTo(Compte, { foreignKey: "idCompte" });

// Sync models
sequelize.sync();

module.exports = {
  Compte,
  Personne,
  Type,
  Permission,
  Material,
  Structure,
  State,
  Service,
  Bureau,
  Salle,
};
