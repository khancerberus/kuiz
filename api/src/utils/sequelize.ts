import { Sequelize } from 'sequelize'

const CONN_STRING = process.env.CONN_STRING ?? 'sqlite::memory:'

const sequelize = new Sequelize(CONN_STRING)

export default sequelize
