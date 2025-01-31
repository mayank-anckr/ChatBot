/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";

// const fs = require('fs');
// const path = require('path');
const Sequelize = require("sequelize");
const process = require("process");
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
// const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

module.exports = sequelize;
