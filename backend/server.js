#!/usr/bin/env node

// Require Express router
const app = require('./index')
// Load Environment config
if (!process.env.NODE_ENV) {
    console.log("Please set environment variable NODE_ENV to 'dev'. Exiting!!!");
    process.exit(0);
}
var conf = require("./config/" + process.env.NODE_ENV + "_conf.json");

const Logger = require('bunyan');
const Sequelize = require('sequelize');
const log = new Logger({
    name: 'peoplegrove',
    streams: [
        {
            level: 'info',
            stream: process.stdout              // log INFO and above to stdout
        },
        {
            level: 'error',
            path: '/tmp/peoplegrove.log'        // log ERROR and above to a file
        }
    ]
});

global.db = {};
global.log = log;
global.conf = conf;

// Creating MySQL connection through sequelize
const sequelize = new Sequelize(conf.mysql.dbname, conf.mysql.username, conf.mysql.password, {
    host: conf.mysql.host,
    dialect: 'mysql',
    logging: false,
});

// Import Models
const models = {
    User: sequelize.import('./schema/User.js'),
    Schedule: sequelize.import('./schema/Schedule.js')
}

// Associating models -> Mapping foreign key references.
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established to MYSQL successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize
    .sync()
    .then(() => {
        console.log('Synced to db');
        bootServer();
    })
    .catch(() => {
        console.log('Sync failed');
    })

models.sequelize = sequelize;
models.Sequelize = Sequelize;

global.db.sql = models;
const port = process.env.PORT || conf.port;

const bootServer = () => app.listen(port, conf.ip, function (error) {
    if (error) {
        console.log("Error while starting up server: ", error);
        log.error('Unable to listen for connections', error);
        process.exit(10);
    }
    console.log("Server up & running on: ", conf.ip + ':' + port);
    log.info('Express is listening on http://' + conf.ip + ':' + port);
});

