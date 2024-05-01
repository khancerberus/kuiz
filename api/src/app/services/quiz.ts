import { type Quiz } from '../models/quiz'
import { TwitchUser } from '../models/twitchUser'

export class QuizService {
  constructor(
    private readonly quizModel: typeof Quiz
  ) {}

  getAll = async (): Promise<Quiz[]> => {
    const quizzes = await this.quizModel.findAll({
      attributes: { exclude: ['ownerId'] },
      include: [{ model: TwitchUser, as: 'owner', attributes: ['twitchId'] }]
    })

    return quizzes
  }

  // finishGame: RequestHandler = async (req, res) => {
  //   const { quiz, questions } = req.body

  //   console.log(quiz)
  //   console.log(questions)

  //   return res.json({ msg: 'ok' })
  // }
}
