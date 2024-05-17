import { type Quiz } from '../models/quiz'
import { type Score } from '../models/score.model'
import { TwitchUser } from '../models/twitchUser'
// import { TwitchService } from './twitch'

export class QuizService {
  constructor(
    private readonly quizModel: typeof Quiz,
    private readonly scoreModel: typeof Score
  ) {}

  getAll = async (): Promise<any[]> => {
    const quizzes = await this.quizModel.findAll({
      attributes: { exclude: ['ownerId'] },
      include: [{ model: TwitchUser, as: 'owner', attributes: ['twitchId'] }]
    })

    // const twitchService = new TwitchService()

    // const quizzesWithOwnerName = await Promise.all(
    //   quizzes.map(async (quiz) => {
    //     const owner = await twitchService.getUser(quiz?.owner?.twitchId ?? '')
    //     return { ...quiz.toJSON(), owner }
    //   })
    // )

    // console.log(quizzesWithOwnerName)

    return quizzes
  }

  getScores = async ({ quizId, userId }: { quizId: string, userId: string }): Promise<any> => {
    const twitchUser = await TwitchUser.findOne({ where: { twitchId: userId } })
    const scores = await this.scoreModel.findAll({
      where: { quizId, playerId: twitchUser?.privateId }
    })

    return scores
  }
}
