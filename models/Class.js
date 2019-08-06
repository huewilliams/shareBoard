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
            default: 'default.png',
        }
    },{
        timestamps: false,
    })
};
