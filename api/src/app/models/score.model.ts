import { DataTypes, type InferAttributes, Model, type ForeignKey, type InferCreationAttributes } from 'sequelize'
import sequelize from '../../utils/sequelize'
import { TwitchUser } from './twitchUser'
import { Quiz } from './quiz'

export class Score extends Model<InferAttributes<Score>, InferCreationAttributes<Score, { omit: 'id' } >> {
  declare id: string
  declare goodAnswers: number
  declare badAnswers: number
  declare notAnswered: number

  declare playerId: ForeignKey<TwitchUser['privateId']>
  declare player?: TwitchUser

  declare quizId: ForeignKey<Quiz['id']>
  declare quiz?: Quiz
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
Score.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' })
