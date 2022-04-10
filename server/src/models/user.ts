import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../config'

export class User extends Model {}

User.init({
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
});