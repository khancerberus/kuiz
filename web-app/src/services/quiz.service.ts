import { api } from '../api'
import { type Quiz } from '../types'

const getAll = async (): Promise<Quiz[]> => {
  const response = await api.get('/quiz')
  return response.data
}

export const QuizService = {
  getAll
}
