import { type RequestHandler } from 'express'
import { GameService } from '../services/game'
import { TwitchUser } from '../models/twitchUser'

export class GameController {
  finishGame: RequestHandler = async (req, res) => {
    const { quiz, questions } = req.body

    // Validar que quiz y questions no sean nulos
    if (quiz == null || questions == null) {
      return res.status(400).json({ message: 'Quiz y questions son requeridos' })
    }

    // Validar que quiz y questions sean objetos
    if (typeof quiz !== 'object' || typeof questions !== 'object') {
      return res.status(400).json({ message: 'Quiz y questions deben ser objetos' })
    }

    // TODO: Cambiar por usuario desde token
    const user = await TwitchUser.findOne({
      where: {
        privateId: '7a0a2230-423b-4879-9373-31c64af5d90f'
      }
    })
    if (user == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const results = await GameService.finishGame({ user, quiz, questions })

    return res.status(200).json({ message: 'Juego finalizado', results })
  }
}
