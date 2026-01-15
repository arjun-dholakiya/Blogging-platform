'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      login_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'normal',
        validate: {
          isIn: [['normal', 'social']]
        }
      },
      login_status: DataTypes.BOOLEAN,
      social_provider: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isIn: [['google', 'facebook', 'apple']]
        }
      },
      social_id: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      freezeTableName: true
    }
  );
  return User;
};
