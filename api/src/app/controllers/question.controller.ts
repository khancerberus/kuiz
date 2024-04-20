import { type Request, type Response } from 'express'
import { Question } from '../models/question.model'

export const QuestionController = {
  getByQuizId: async (req: Request, res: Response): Promise<Response> => {
    const { quizId } = req.params

    const questions = await Question.findAll({
      where: {
        quizId
      }
    })

    return res.json({
      questions: questions.map(question => {
        return {
          id: question.id,
          description: question.description,
          options: question.options
        }
      })
    })
  }
}
