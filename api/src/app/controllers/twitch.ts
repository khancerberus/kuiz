import { type RequestHandler } from 'express'
import { type TwitchService } from '../services/twitch'

export class TwitchController {
  constructor(
    private readonly twitchService: TwitchService
  ) {}

  getUser: RequestHandler = async (req, res) => {
    const { twitchId } = req.params
    console.log('twitchId', twitchId)

    try {
      const user = await this.twitchService.getUser(twitchId)
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: 'internal server error' })
    }
  }
}
