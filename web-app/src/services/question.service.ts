import { api } from '../api'
import { type Question } from '../types'

const getByQuizId = async ({ quizId }: { quizId: string }): Promise<Question[]> => {
  const response = await api.get(`/question/${quizId}`)
  return response.data
}

export const QuestionService = {
  getByQuizId
}
