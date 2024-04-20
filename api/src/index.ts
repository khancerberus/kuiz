import express, { type RequestHandler, type Request, type Response } from 'express'
import helmet from 'helmet'
import sequelize from './utils/sequelize'
import { createAdminRouter } from './app/routers/admin.route'
import { createQuizRouter } from './app/routers/quiz.route'
import { createQuestionRouter } from './app/routers/question.route'

const app = express()
app.use(express.json())
app.use(helmet())

app.use((_, res, next) => {
  // Modify this middleware in production
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

app.use('/admin', createAdminRouter())
app.use('/quiz', createQuizRouter())
app.use('/question', createQuestionRouter())

const syncTables = async (_req: Request, res: Response): Promise<Response> => {
  await sequelize.sync({ force: true })

  return res.json({
    message: 'Database synced successfully'
  })
}

app.get('/syncTables', (syncTables) as RequestHandler)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
