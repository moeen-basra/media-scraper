import { DataTypes, Model, Op } from "sequelize";
import { sequelize } from "../config";

export class Media extends Model {}

Media.init({
  title: DataTypes.STRING,
  src: DataTypes.STRING,
  type: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Media',
  tableName: 'medias',
  scopes: {
    type(value: string) {
      console.log(value)
      return {
        where: {
          type: value
        }
      }
    },
    title(value: string) {
      return {
        where: {
          title: {
            [Op.iLike]: `%${value}%`
          }
        }
      }
    }
  }
});