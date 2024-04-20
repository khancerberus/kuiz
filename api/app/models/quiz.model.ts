import { BelongsToSetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, InferAttributes, Model, NonAttribute } from 'sequelize'
import sequelize from '../../utils/sequelize'
import { Question } from './question.model'
import { TwitchUser } from './twitchUser.model'

export class Quiz extends Model<InferAttributes<Quiz>> {
  declare id: string
  declare name: string
  declare description: string

  declare owner?: NonAttribute<TwitchUser>
  declare setOwner: BelongsToSetAssociationMixin<TwitchUser, string>

  declare questions?: NonAttribute<Question[]>
  declare getQuestions: HasManyGetAssociationsMixin<Question[]>
}

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

Quiz.belongsTo(TwitchUser, { foreignKey: 'ownerId', as: 'owner' })
Quiz.hasMany(Question, { foreignKey: 'quizId', as: 'questions' })
