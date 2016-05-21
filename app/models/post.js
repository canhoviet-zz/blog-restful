"use strict";

export default function (sequelize, DataTypes) {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('draft', 'published'),
            defaultValue: 'draft',
            allowNull: false
        }
    }, {
        classMethods: {
            associate: (models) =>{
                Post.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        fieldName: 'userId',
                        allowNull: false
                    },
                    targetKey: 'userName'
                });
            }
        }
    });

  return Post;
};
