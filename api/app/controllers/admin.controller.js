import { TwitchUser } from '../models/twitchUser.model.js'
import { Quiz } from '../models/quiz.model.js'

export const AdminController = {
  createUser: async (req, res) => {
    const newUser = await TwitchUser.create(req.body)

    res.json({
      user: newUser
    })
  },
  createQuiz: async (req, res) => {
    const { quiz, owner } = req.body

    const ownerUser = await TwitchUser.findOne({
      where: {
        privateId: owner
      }
    })
    if (!ownerUser) {
      return res.status(404).json({
        message: 'Owner not found'
      })
    }

    const newQuiz = await Quiz.create(quiz, {
      include: [Quiz.Questions]
    })

    newQuiz.setOwner(ownerUser)
    newQuiz.save()

    res.json({
      quiz: newQuiz
    })
  }
}
