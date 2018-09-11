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

class ServiceRequestAttributes {
  id?: number;
  serviceId?: number;
  httpStatusCode: number;
}

type ServiceRequestInstance = Sequelize.Instance<ServiceRequestAttributes> & ServiceRequestAttributes;
type ServiceRequestModel = Sequelize.Model<ServiceRequestInstance, ServiceRequestAttributes>;

async function createServiceTable(db: Database) {
  db.services = sequelize.define<ServiceInstance, ServiceAttributes>("service",
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      url: {type: Sequelize.STRING, allowNull: false},
      indexName: {type: Sequelize.STRING, allowNull: false},
      typeName: {type: Sequelize.STRING, allowNull: false},
      lastFetch: {type: Sequelize.DATE, allowNull: true},
    });
  await db.services.sync();
}

async function createServiceRequestTable(db: Database) {
  db.serviceRequests = sequelize.define<ServiceRequestInstance, ServiceRequestAttributes>("serviceRequest",
    {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      httpStatusCode: {type: Sequelize.INTEGER, allowNull: false},
    });
  db.serviceRequests.belongsTo(db.services);
  await db.serviceRequests.sync();
}

interface Database {
  services?: ServiceModel;
  serviceRequests?: ServiceRequestModel;
  creationPromise?: Promise<void>;
}

async function createTables(db: Database) {
  await createServiceTable(db);
  await createServiceRequestTable(db);
}

const db: Database = {
};

db.creationPromise = new Promise((resolve, reject) => {
  createTables(db).then(function() {
    console.info("Database created.");
    resolve();
  }, function() {
    console.error("Failed to create database.");
    reject();
  }).catch(function() {
    console.error("Failed to create database.");
    reject();
  });
});


export = db;
