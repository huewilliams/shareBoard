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
db.Task = require('./Task')(sequelize, Sequelize);

db.Class.hasMany(db.Task, { foreignKey: 'className', sourceKey: 'name'});
db.Task.belongsTo(db.Class, { foreignKey: 'className', targetKey: 'name'});

module.exports = db;
