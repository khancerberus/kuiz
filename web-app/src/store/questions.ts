import { create } from 'zustand'

interface Question {
  question: string
  options: string[]
  correct?: number
  selectedAnswer?: number
}

interface QuestionsState {
  currentQuestion: number
  questions: Question[]
  previousQuestion: () => void
  nextQuestion: () => void
  setSelectedAnswer: (question: number, option: number) => void
}

const globalQuestions: Question[] = [
  {
    question: '¿Cuál es la capital de Francia?',
    options: ['Madrid', 'París', 'Londres', 'Berlín']
  },
  {
    question: '¿De qué color es el logo de Twitch?',
    options: ['Morado', 'Azul', 'Rojo', 'Verde']
  },
  {
    question: '¿Cuál es el país mas grande del mundo en territorio?',
    options: ['Canadá', 'China', 'Rusia', 'Estados Unidos']
  }
]

export const useQuestions = create<QuestionsState>((set) => ({
  currentQuestion: 0,
  questions: globalQuestions,
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
