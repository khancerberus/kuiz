import { Router } from 'express'
import { QuestionController } from '../controllers/question.controller'

export const createQuestionRouter = () => {
  const router = Router()

  router.get('/:quizId', QuestionController.getByQuizId)

  return router
}
