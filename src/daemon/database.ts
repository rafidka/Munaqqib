import Sequelize from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
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

sequelize.authenticate();

class ServiceAttributes {
  id?: number;
  url: string;
  indexName: string;
  typeName: string;
  lastFetch?: Date;
}

type ServiceInstance = Sequelize.Instance<ServiceAttributes> & ServiceAttributes;
type ServiceModel = Sequelize.Model<ServiceInstance, ServiceAttributes>;

function createServiceTable(db: Database) {
  db.Services = sequelize.define<ServiceInstance, ServiceAttributes>("service",
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      url: {type: Sequelize.STRING, allowNull: false},
      indexName: {type: Sequelize.STRING, allowNull: false},
      typeName: {type: Sequelize.STRING, allowNull: false},
      lastFetch: {type: Sequelize.DATE, allowNull: true},
    });
  db.Services.sync();
}

interface Database {
  Services?: ServiceModel;
}

const db: Database = {};
createServiceTable(db);

export = db;
