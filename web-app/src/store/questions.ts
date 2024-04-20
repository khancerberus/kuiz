import { create } from 'zustand'
import { type Question } from '../types'

interface QuestionsState {
  currentQuestion: number
  questions: Question[]
  initQuestions: (questions: Question[]) => void
  previousQuestion: () => void
  nextQuestion: () => void
  setSelectedAnswer: (question: number, option: number) => void
}

export const useQuestions = create<QuestionsState>((set) => ({
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
  setSelectedAnswer: (question: number, option: number) => {
    set((state) => {
      const questions = state.questions.map((q, index) => {
        if (index === question) {
          return { ...q, selectedAnswer: option }
        }
        return q
      })
      return { questions }
    })
  }
}))
