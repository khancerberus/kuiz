import { DataTypes, Model } from 'sequelize'
import sequelize from '../../utils/sequelize.js'

export class Question extends Model {}

Question.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'QUESTION',
  freezeTableName: true
})
