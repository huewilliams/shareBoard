module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Document', {
        content: {
            type: DataTypes.TEXT,
            defaultValue: '',
        },
        status: {
            type: DataTypes.STRING(10),
            defaultValue: 'edit',
        },
        number: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    },{
        timestamps: false,
    })
};
