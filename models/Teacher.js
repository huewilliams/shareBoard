module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Teacher', {
        id: {
            type: DataTypes.STRING(20),
            required: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(10),
            required: true,
        },
        password: {
            type: DataTypes.STRING(30),
            required: true,
        },
        school: {
            type: DataTypes.STRING(30),
            required: true,
        }
    },{
        timestamps: false,
    })
};
