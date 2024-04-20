import { DataTypes, ForeignKey, InferAttributes, Model, NonAttribute } from 'sequelize'
import sequelize from '../../utils/sequelize'
import { Quiz } from './quiz.model'

export class Question extends Model<InferAttributes<Question>> {
  declare id: string
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
  modelName: 'QUESTION',
  freezeTableName: true
})
