import { type RequestHandler, Router } from 'express'
import { AdminController } from '../controllers/admin.controller'

export const createAdminRouter = (): Router => {
  const router = Router()

  router.post('/user', (AdminController.createUser) as RequestHandler)
  router.post('/quiz', (AdminController.createQuiz) as RequestHandler)

  return router
}
