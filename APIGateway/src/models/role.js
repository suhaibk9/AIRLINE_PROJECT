'use strict';
const { Model } = require('sequelize');
const { ENUMS } = require('../utils/common/index');
const { USER_ROLES } = ENUMS;
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = USER_ROLES;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
         this.belongsToMany(models.User, { through: 'User_Roles', as: 'user' });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM,
        values: [ADMIN, CUSTOMER, FLIGHT_COMPANY],
        allowNull: false,
        defaultValue: CUSTOMER,
      },
    },
    {
      sequelize,
      modelName: 'Role',
    }
  );
  return Role;
};
