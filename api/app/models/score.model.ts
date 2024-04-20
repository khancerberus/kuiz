import { DataTypes, InferAttributes, Model } from 'sequelize'
import sequelize from '../../utils/sequelize'
import { TwitchUser } from './twitchUser.model'
import { Quiz } from './quiz.model'

export class Score extends Model<InferAttributes<Score>> {
  declare id: string
  declare goodAnswers: Number
  declare badAnswers: Number
  declare notAnswered: Number
}

Score.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  goodAnswers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  badAnswers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  notAnswered: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'SCORE',
  freezeTableName: true
})

Score.belongsTo(TwitchUser, { foreignKey: 'playerId', as: 'player' })
Score.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz'})
