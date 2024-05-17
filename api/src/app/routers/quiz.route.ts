import { Router } from 'express'
import { QuizController } from '../controllers/quiz'
import { QuizService } from '../services/quiz'
import { Quiz } from '../models/quiz'
import { Score } from '../models/score.model'

export const createQuizRouter = (): Router => {
  const router = Router()
  const quizService = new QuizService(Quiz, Score)
  const quizController = new QuizController(quizService)

  router.get('/quiz', quizController.getAll)
  // router.post('/quiz/finishGame', controller.finishGame)
  router.get('/score/quiz/:quizId', quizController.getScores)

  return router
}
