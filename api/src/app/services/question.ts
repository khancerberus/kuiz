import { type Question } from '../models/question'

export class QuestionService {
  constructor (
    private readonly questionModel: typeof Question
  ) {}

  getAllByQuizId = async ({ quizId }: { quizId: string }): Promise<Question[]> => {
    const questions = await this.questionModel.findAll({
      where: {
        quizId
      },
      attributes: { exclude: ['answer'] }
    })

    return questions
  }
}
