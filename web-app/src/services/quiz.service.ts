import { api } from '../utils/api'
import { type Question, type Quiz } from '../types'

const getAll = async (): Promise<Quiz[]> => {
  const { data } = await api.get('/quiz')
  return data
}

const finishGame = async ({ quiz, questions }: { quiz: Quiz | null, questions: Question[] }): Promise<any> => {
  const response = await api.post('/finishGame', {
    quiz,
    questions
  })
  return response.data
}

const getScores = async (quizId: string): Promise<any> => {
  const { data } = await api.get(`/score/quiz/${quizId}`)
  return data
}

export const QuizService = {
  getAll,
  finishGame,
  getScores
}
