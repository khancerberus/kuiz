import { Sequelize } from 'sequelize'

const CONN_STRING = process.env.CONN_STRING ?? 'sqlite::memory:'

const sequelize = new Sequelize(CONN_STRING, {
  logging: false
})

export default sequelize
