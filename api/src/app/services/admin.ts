import { type Quiz } from '../models/quiz'
import { type TwitchUser } from '../models/twitchUser'

export class AdminService {
  constructor(
    private readonly twitchUserModel: typeof TwitchUser,
    private readonly quizModel: typeof Quiz
  ) {}

  createUser = async ({ twitchUser }: { twitchUser: TwitchUser }): Promise<TwitchUser> => {
    const createdUser = await this.twitchUserModel.create(twitchUser)

    return createdUser
  }

  createQuiz = async ({ quiz }: { quiz: Quiz }): Promise<Quiz | null> => {
    console.log(quiz)
    const owner = await this.twitchUserModel.findOne({
      where: {
        privateId: quiz.ownerId
      }
    })

    if (owner == null) {
      return null
    }

    const newQuiz = await this.quizModel.create(quiz, {
      include: [this.quizModel.associations.questions]
    })

    await newQuiz.setOwner(owner)
    await newQuiz.save()

    return newQuiz
  }
}
