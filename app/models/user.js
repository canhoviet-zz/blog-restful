"use strict";

export default function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'inactive',
            allowNull: false
        }
    }, {
            classMethods: {
                associate: function(models) {
                    User.hasMany(models.Post, { foreignKey: 'userId'});
                }
            }
      });
      return User;
};
