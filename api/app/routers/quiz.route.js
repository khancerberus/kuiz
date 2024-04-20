import { Router } from 'express'
import { QuizController } from '../controllers/quiz.controller.js'

export const createQuizRouter = () => {
  const router = Router()

  router.get('/', QuizController.getAll)

  return router
}
