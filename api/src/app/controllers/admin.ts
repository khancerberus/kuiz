import { type RequestHandler } from 'express'
import { type AdminService } from '../services/admin'

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  getUsers: RequestHandler = async (_, res) => {
    const users = await this.adminService.getUsers()

    return res.json({
      users
    })
  }

  // #region createUser
  createUser: RequestHandler = async (req, res) => {
    const { twitchUser } = req.body
    const newUser = await this.adminService.createUser({ twitchUser })

    if (newUser == null) {
      return res.status(400).json({
        message: 'User not created'
      })
    }

    return res.json({
      newUser
    })
  }

  // #region createQuiz
  createQuiz: RequestHandler = async (req, res) => {
    const { quiz } = req.body

    const newQuiz = await this.adminService.createQuiz({ quiz })

    if (newQuiz == null) {
      return res.status(400).json({
        message: 'Quiz not created'
      })
    }

    return res.json({
      newQuiz
    })
  }
}
