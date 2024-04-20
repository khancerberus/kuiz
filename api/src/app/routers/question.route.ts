import { type RequestHandler, Router } from 'express'
import { QuestionController } from '../controllers/question.controller'

export const createQuestionRouter = (): Router => {
  const router = Router()

  router.get('/:quizId', (QuestionController.getByQuizId) as RequestHandler)

  return router
}
