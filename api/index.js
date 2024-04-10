import express from 'express'
import helmet from 'helmet'
import sequelize from './utils/sequelize.js'
import { createAdminRouter } from './app/routers/admin.route.js'
import { createQuizRouter } from './app/routers/quiz.route.js'

const app = express()
app.use(express.json())
app.use(helmet())

app.use((req, res, next) => {
  // Modify this middleware in production
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

app.use('/admin', createAdminRouter())
app.use('/quiz', createQuizRouter())

app.get('/syncTables', async (req, res) => {
  await sequelize.sync({ force: true })

  res.json({
    message: 'Database synced successfully'
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
