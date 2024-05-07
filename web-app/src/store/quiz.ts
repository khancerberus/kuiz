import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Quiz } from '../types'

interface QuizState {
  currentQuizz: Quiz | null
  setCurrentQuizz: (quizz: Quiz | null) => void
}

export const useQuizzes = create<QuizState>()(devtools(persist(
  (set) => ({
    currentQuizz: null,
    setCurrentQuizz: (quizz) => {
      set({ currentQuizz: quizz })
    }
  }),
  { name: 'quizzes' }
)))
