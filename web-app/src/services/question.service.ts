import { api } from '../api'
import { type Question } from '../types'

const getByQuizId = async ({ quizId }: { quizId: string }): Promise<Question[]> => {
  const { data: questions } = await api.get(`/question/${quizId}`)
  return questions
}

export const QuestionService = {
  getByQuizId
}
