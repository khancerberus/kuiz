import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { type Question } from '../types'

interface QuestionState {
  currentQuestion: Question | null
  questions: Question[]
  resetQuestions: () => void
  initQuestions: (questions: Question[]) => void
  previousQuestion: () => void
  nextQuestion: () => void
  setSelectedAnswer: (currentQuestion: Question, option: string) => void
}

export const useQuestions = create<QuestionState>()(devtools(persist(
  (set, get) => ({
    currentQuestion: null,
    questions: [],
    resetQuestions: () => {
      set({ questions: [], currentQuestion: null })
    },
    initQuestions: (questions) => {
      set({
        questions,
        currentQuestion: questions[0]
      })
    },
    previousQuestion: () => {
      if (get().currentQuestion == null) {
        set({ currentQuestion: get().questions[0] })
        return
      }
      set((state) => {
        const currentIndex = state.questions.findIndex(
          (question) => question.id === state.currentQuestion?.id
        )
        const previousIndex =
          currentIndex === 0 ? state.questions.length - 1 : currentIndex - 1
        return { currentQuestion: state.questions[previousIndex] }
      })
    },
    nextQuestion: () => {
      if (get().currentQuestion == null) {
        set({ currentQuestion: get().questions[0] })
        return
      }
      set((state) => {
        const currentIndex = state.questions.findIndex(
          (question) => question.id === state.currentQuestion?.id
        )
        const nextIndex =
          currentIndex === state.questions.length - 1 ? 0 : currentIndex + 1
        return { currentQuestion: state.questions[nextIndex] }
      })
    },
    setSelectedAnswer: (currentQuestion, option) => {
      set((state) => {
        const newQuestions = state.questions.map((question) => {
          if (question.id === currentQuestion.id) {
            return { ...question, selectedAnswer: option }
          }
          return question
        })
        return {
          questions: newQuestions,
          currentQuestion: { ...currentQuestion, selectedAnswer: option }
        }
      })
    }
  }),
  {
    name: 'questions',
    getStorage: () => localStorage
  }
)))
