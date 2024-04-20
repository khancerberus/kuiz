import { Request, Response } from 'express'
import { TwitchUser } from '../models/twitchUser.model'
import { Quiz } from '../models/quiz.model'

export const AdminController = {
  createUser: async (req: Request, res: Response): Promise<Response> => {
    const newUser = await TwitchUser.create(req.body)

    return res.json({
      user: newUser
    })
  },
  createQuiz: async (req: Request, res: Response): Promise<Response> => {
    const quiz = req.body

    const owner = await TwitchUser.findOne({
      where: {
        privateId: quiz.ownerId
      }
    })
    if (owner == null) {
      return res.status(404).json({
        message: 'Owner not found'
      })
    }

    const newQuiz = await Quiz.create(quiz, {
      include: [Quiz.associations.questions]
    })

    await newQuiz.setOwner(owner)
    await newQuiz.save()

    return res.json({
      quiz: newQuiz
    })
  }
}
