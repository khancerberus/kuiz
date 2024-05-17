import { type RequestHandler } from 'express'
import { type Request as JWTRequest } from 'express-jwt'
import { type QuizService } from '../services/quiz'

export class QuizController {
  constructor (
    private readonly quizService: QuizService
  ) {}

  getAll: RequestHandler = async (_req, res) => {
    const quizzes = await this.quizService.getAll()

    if (quizzes == null) {
      return res.status(404).json({
        message: 'No quizzes found'
      })
    }

    return res.json(quizzes)
  }

  getScores: RequestHandler = async (req: JWTRequest, res) => {
    const scores = await this.quizService.getScores({
      quizId: req.params.quizId,
      userId: req.auth?.userId
    })

    if (scores == null) {
      return res.status(404).json({
        message: 'No scores found'
      })
    }

    return res.json(scores)
  }
}
