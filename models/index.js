const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        'host': process.env.DB_HOST,
        'dialect': process.env.DB_TYPE,
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Class = require('./Class')(sequelize, Sequelize);

module.exports = db;
