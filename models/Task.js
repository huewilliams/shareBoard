const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Task', {
        taskId: {
            type: DataTypes.STRING(50),
            defaultValue: uuid(),
            primaryKey: true,
        },
        taskName: {
            type: DataTypes.STRING(30),
            required: true,
        },
        taskStart: {
            type: DataTypes.DATE,
            defaultValue: getDate(new Date()),
        },
        taskEndLine: {
            type: DataTypes.DATE,
            required: true,
        },
        taskInfo : {
            type: DataTypes.TEXT,
            required: true,
        },
        file : {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    },{
        timestamps: false,
    })
};

function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if(month < 10) {
        month = "0"+month;
    }
    if(day < 10) {
        day = "0"+day;
    }
    if(hours < 10) {
        hours = "0"+hours;
    }
    if(minutes < 10) {
        minutes = "0"+minutes;
    }

    const result = `${year}-${month}-${day} ${hours}:${minutes}`;
    return result;
}
