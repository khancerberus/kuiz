import { type RequestHandler } from 'express'
import { type QuestionService } from '../services/question'

export class QuestionController {
  constructor (
    private readonly questionService: QuestionService
  ) {}

  getAllByQuizId: RequestHandler = async (req, res) => {
    const { quizId } = req.params

    const questions = await this.questionService.getAllByQuizId({ quizId })

    if (questions == null) {
      return res.status(404).json({
        message: 'No questions found'
      })
    }

    return res.json(questions)
  }
}
