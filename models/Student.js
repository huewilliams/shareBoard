module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Student', {
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
        number: {
            type: DataTypes.INTEGER,
            required: true,
        }
    },{
        timestamps: false,
    })
};
