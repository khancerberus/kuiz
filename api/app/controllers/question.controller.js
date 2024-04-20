import { Question } from '../models/question.model.js'

export const QuestionController = {
  getByQuizId: async (req, res) => {
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
