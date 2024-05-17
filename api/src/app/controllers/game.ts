import { type RequestHandler } from 'express'
import { type Request as JWTRequest } from 'express-jwt'
import { GameService } from '../services/game'
import { TwitchUser } from '../models/twitchUser'

export class GameController {
  finishGame: RequestHandler = async (req: JWTRequest, res) => {
    const { quiz, questions } = req.body

    // Validar que quiz y questions no sean nulos
    if (quiz == null || questions == null) {
      return res
        .status(400)
        .json({ message: 'Quiz y questions son requeridos' })
    }

    // Validar que quiz y questions sean objetos
    if (typeof quiz !== 'object' || typeof questions !== 'object') {
      return res
        .status(400)
        .json({ message: 'Quiz y questions deben ser objetos' })
    }

    const userId = req.auth?.userId

    const user = await TwitchUser.findOne({
      where: {
        twitchId: userId
      }
    })
    if (user == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const results = await GameService.finishGame({ user, quiz, questions })

    return res.status(200).json({ message: 'Juego finalizado', results })
  }
}
