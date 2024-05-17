import { Router } from 'express'
import { AdminController } from '../controllers/admin'
import { AdminService } from '../services/admin'
import { TwitchUser } from '../models/twitchUser'
import { Quiz } from '../models/quiz'

export const createAdminRouter = (): Router => {
  const router = Router()
  const adminService = new AdminService(TwitchUser, Quiz)
  const adminController = new AdminController(adminService)

  router.get('/user', adminController.getUsers)
  router.post('/user', adminController.createUser)
  router.post('/quiz', adminController.createQuiz)

  return router
}
