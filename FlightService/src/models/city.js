'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //1 City has many airports
      City.hasMany(models.Airport, {
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'City',
    }
  );
  return City;
};
/**
 To Create a model you can use the sequelize-cli command:
  npx sequelize model:generate --name City --attributes name:string
  After creating the model, you can run the migration using the following command:
  npx sequelize db:migrate 
  Also say after creating the model and running the migration you for some reason drop the DB 
  To recreate the DB you can run the following command:
  npx sequelize db:create then run the migration again


  To create a new migration you can use the following command:
  npx sequelize migration:generate --name create-city
 */
