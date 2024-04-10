import { DataTypes, Model } from 'sequelize'
import sequelize from '../../utils/sequelize.js'
import { Question } from './question.model.js'
import { TwitchUser } from './twitchUser.model.js'

export class Quiz extends Model {}

Quiz.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'QUIZ',
  freezeTableName: true
})

Quiz.Owner = Quiz.belongsTo(TwitchUser, { foreignKey: 'ownerId', as: 'owner' })
Quiz.Questions = Quiz.hasMany(Question, { foreignKey: 'quizId', as: 'questions' })
