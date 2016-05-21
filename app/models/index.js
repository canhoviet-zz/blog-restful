'use strict';

import fs from 'fs';
import path from 'path';
var Sequelize = require('sequelize');
import * as config from '../../config/config';
import * as logger from '../util/logger';
import Promise from 'bluebird';

const basename  = path.basename(module.filename);
const db = {};
const dbConfig = config.db;
let sequelize;

try{
    sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
    logger.info('Connected to the db...');
} catch(e){
    logger.error('Failed to connect to the db. Errors: ', e);
    throw e;
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
