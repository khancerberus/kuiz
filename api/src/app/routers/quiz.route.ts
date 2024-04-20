import { type RequestHandler, Router } from 'express'
import { QuizController } from '../controllers/quiz.controller'

export const createQuizRouter = (): Router => {
  const router = Router()

  router.get('/', (QuizController.getAll) as RequestHandler)

  return router
}
