export interface Quiz {
  id: string
  name: string
  description: string
  owner: string
}

interface Question {
  description: string
  options: string[]
  correct?: number
  selectedAnswer: number | null
}
