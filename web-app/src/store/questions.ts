import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Question } from '../types'

interface QuestionsState {
  currentQuestion: number
  questions: Question[]
  initQuestions: (questions: Question[]) => void
  previousQuestion: () => void
  nextQuestion: () => void
  setSelectedAnswer: (questionIndex: number, option: string) => void
}

export const useQuestions = create<QuestionsState>()(
  devtools(
    persist(
      (set, get) => ({
        currentQuestion: 0,
        questions: [],
        initQuestions: (questions: Question[]) => {
          set({ questions })
        },
        previousQuestion: () => {
          set((state) => ({
            currentQuestion:
              state.currentQuestion !== 0
                ? state.currentQuestion - 1
                : state.questions.length - 1
          }))
        },
        nextQuestion: () => {
          set((state) => ({
            currentQuestion:
              state.currentQuestion !== state.questions.length - 1
                ? state.currentQuestion + 1
                : 0
          }))
        },
        setSelectedAnswer: (questionIndex, option) => undefined // TODO Implementar
      }),
      {
        name: 'questions-storage',
        getStorage: () => localStorage
      }
    )
  )
)
