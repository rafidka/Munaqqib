import Sequelize from "sequelize";


const db = new Sequelize("database", "username", "password", {
  dialect: "sqlite",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: "database.sqlite",

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

function createServiceTable() {
  const Service = db.define("service", {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    url: {type: Sequelize.STRING, allowNull: false},
    indexName: {type: Sequelize.STRING, allowNull: false},
    typeName: {type: Sequelize.STRING, allowNull: false},
    lastFetch: {type: Sequelize.DATE, allowNull: false},
  });
}

