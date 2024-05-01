import { Router } from 'express'
import { QuestionController } from '../controllers/question'
import { QuestionService } from '../services/question'
import { Question } from '../models/question'

export const createQuestionRouter = (): Router => {
  const router = Router()
  const questionService = new QuestionService(Question)
  const questionController = new QuestionController(questionService)

  router.get('/:quizId', /** validator.questionById, */ questionController.getAllByQuizId)

  return router
}
