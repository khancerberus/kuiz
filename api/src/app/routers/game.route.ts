import { Router } from 'express'
import { GameController } from '../controllers/game'

export const createGameRouter = () => {
  const router = Router()
  const gameController = new GameController()

  router.post('/quiz/finishGame', gameController.finishGame)

  return router
}
