import { Router } from 'express'
import { AdminController } from '../controllers/admin.controller.js'

export const createAdminRouter = () => {
  const router = Router()

  router.post('/user', AdminController.createUser)
  router.post('/quiz', AdminController.createQuiz)

  return router
}
