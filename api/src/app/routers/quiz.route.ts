import { Router } from 'express'
import { QuizController } from '../controllers/quiz'
import { QuizService } from '../services/quiz'
import { Quiz } from '../models/quiz'

export const createQuizRouter = (): Router => {
  const router = Router()
  const quizService = new QuizService(Quiz)
  const quizController = new QuizController(quizService)

  router.get('/quiz', quizController.getAll)
  // router.post('/quiz/finishGame', controller.finishGame)

  return router
}
