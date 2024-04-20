import { DataTypes, InferAttributes, Model } from 'sequelize'
import sequelize from '../../utils/sequelize'

export class TwitchUser extends Model<InferAttributes<TwitchUser>> {
  declare privateId: string
  declare twitchId: string
  declare email: string
}

TwitchUser.init({
  privateId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  twitchId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'TWITCH_USER',
  freezeTableName: true
})
