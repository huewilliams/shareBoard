module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Class', {
        name: {
            type: DataTypes.STRING(10),
            required: true,
            primaryKey: true,
        },
        info: {
            type: DataTypes.TEXT,
            required: true,
        },
        img: {
            type: DataTypes.TEXT,
            defaultValue: 'default.png',
        }
    },{
        timestamps: false,
    })
};
