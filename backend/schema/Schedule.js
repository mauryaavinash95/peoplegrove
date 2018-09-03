module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('schedule', {
        guest: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATEONLY,
            unique: 'compositeIndex',
            allowNull: false
        },
        time: {
            type: DataTypes.INTEGER,
            unique: 'compositeIndex',
            allowNull: false
        },
        details: {
            type: DataTypes.STRING,
            allowNull: true
        },
        system: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Schedule.associate = (models) => {
        // 1:M
        Schedule.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'host',
            targetKey: 'username',
            unique: 'compositeIndex'
        });
    };

    return Schedule;
};