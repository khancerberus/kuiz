import { Router } from 'express'
import { Quiz } from '../models/quiz.model.js'

export const createQuizRouter = () => {
  const router = Router()

  router.get('/', async (req, res) => {
    const quizzes = await Quiz.findAll({
      include: 'owner'
    })
    if (!quizzes) {
      return res.status(404).json({
        message: 'No quizzes found'
      })
    }

    return res.json(quizzes.map(quiz => ({
      id: quiz?.id,
      name: quiz?.name,
      description: quiz?.description,
      owner: quiz?.owner?.twitchId
    })))
  })

  return router
}
