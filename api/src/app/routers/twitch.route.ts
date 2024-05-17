import { Router } from 'express'
import { TwitchService } from '../services/twitch'
import { TwitchController } from '../controllers/twitch'

export const createTwitchRouter = (): Router => {
  const router = Router()
  const twitchService = new TwitchService()
  const twitchController = new TwitchController(twitchService)

  router.get('/twitch/user/:twitchId', twitchController.getUser)

  return router
}
