import { type RequestHandler } from 'express'
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
}
