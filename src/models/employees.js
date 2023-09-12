'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return {...this.get(), id: undefined};
    }
  }
  Employees.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull : false
    },
    position: {
      type: DataTypes.STRING, 
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Employees',
    tableName: 'Employees',
  });
  return Employees;
};