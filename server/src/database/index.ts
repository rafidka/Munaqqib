import Sequelize from "sequelize";
import { Error } from "tslint/lib/error";
import { ERROR_LOGGER, GENERAL_LOGGER, SQL_LOGGER } from "../logging";

GENERAL_LOGGER.log(
  "info",
  "Setting up Sequelize with database: " + process.env.DATABASE
);

const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: process.env.DATABASE,

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,

  logging: (message: string) => {
    SQL_LOGGER.log("info", message);
  }
});

class ServiceAttributes {
  id?: number;
  url?: string;
  indexName?: string;
  typeName?: string;
  lastFetch?: Date;
}

type ServiceInstance = Sequelize.Instance<ServiceAttributes> &
  ServiceAttributes;
type ServiceModel = Sequelize.Model<ServiceInstance, ServiceAttributes>;

class ServiceRequestAttributes {
  id?: number;
  serviceId?: number;
  httpStatusCode?: number;
}

type ServiceRequestInstance = Sequelize.Instance<ServiceRequestAttributes> &
  ServiceRequestAttributes;
type ServiceRequestModel = Sequelize.Model<
  ServiceRequestInstance,
  ServiceRequestAttributes
>;

class Database {
  private _services?: ServiceModel;
  private _serviceRequests?: ServiceRequestModel;
  creationPromise?: Promise<void>;

  public constructor() {
    this.creationPromise = new Promise((resolve, reject) => {
      this.createModels()
        .then(
          function() {
            GENERAL_LOGGER.log("info", "Database created.");
            resolve();
          },
          function() {
            ERROR_LOGGER.log("error", "Failed to create database.");
            reject();
          }
        )
        .catch(function() {
          ERROR_LOGGER.log("error", "Failed to create database.");
          reject();
        });
    });
  }

  public get services(): ServiceModel {
    if (!this._services) {
      throw new Error("this._services is undefined.");
    }
    return this._services;
  }

  public get serviceRequests(): ServiceRequestModel {
    if (!this._serviceRequests) {
      throw new Error("this._serviceRequests is undefined.");
    }
    return this._serviceRequests;
  }

  private async createModels() {
    await this.createServiceModel();
    await this.createServiceRequestModel();
  }

  private async createServiceModel() {
    this._services = sequelize.define<ServiceInstance, ServiceAttributes>(
      "service",
      {
        id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        url: { type: Sequelize.STRING, allowNull: false },
        indexName: { type: Sequelize.STRING, allowNull: false },
        typeName: { type: Sequelize.STRING, allowNull: false },
        lastFetch: { type: Sequelize.DATE, allowNull: true }
      }
    );
    await this._services.sync();
  }

  private async createServiceRequestModel() {
    if (!this._services) {
      throw new Error(
        "this._services is undefined. createServiceModel() should be called before calling this function."
      );
    }
    this._serviceRequests = sequelize.define<
      ServiceRequestInstance,
      ServiceRequestAttributes
    >("serviceRequest", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      httpStatusCode: { type: Sequelize.INTEGER, allowNull: false }
    });
    this._serviceRequests.belongsTo(this._services);
    await this._serviceRequests.sync();
  }
}

export = new Database();
