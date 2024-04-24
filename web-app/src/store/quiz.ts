import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Quiz } from '../types'

interface QuizzesState {
  currentQuizz: Quiz | null
  setCurrentQuizz: (quizz: Quiz) => void
}

export const useQuizzes = create(devtools(persist<QuizzesState>(
  (set) => ({
    currentQuizz: null,
    setCurrentQuizz: (quizz: Quiz) => {
      set({ currentQuizz: quizz })
    }
  }),
  { name: 'quizzes' }
)))
