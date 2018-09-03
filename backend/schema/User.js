module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email",
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
            default: 'Asia/Kolkata'
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return User;
};