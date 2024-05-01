import {
  type ForeignKey,
  type InferAttributes,
  type NonAttribute,
  type InferCreationAttributes,
  DataTypes,
  Model,
  type CreationOptional
} from 'sequelize'
import sequelize from '../../utils/sequelize'
import { type Quiz } from './quiz'

export class Question extends Model<InferAttributes<Question>, InferCreationAttributes<Question>> {
  declare id: CreationOptional<string>
  declare description: string
  declare options: string[]
  declare answer: string

  declare quizId: ForeignKey<Quiz['id']>
  declare quiz?: NonAttribute<Quiz>
}

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
  tableName: 'QUESTION',
  freezeTableName: true
})
