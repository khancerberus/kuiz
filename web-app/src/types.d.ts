export interface TwitchUser {
  twitchId: string
  username: string
}

export interface Quiz {
  id: string
  name: string
  description: string
  owner: TwitchUser
  createdAt: string
  updatedAt: string
}

interface Question {
  id: string
  description: string
  options: string[]
  correct?: number
  selectedAnswer: string | null
}

interface Score {
  id: string
  goodAnswers: number
  badAnswers: number
  notAnswered: number
  player: TwitchUser
  quiz: Quiz
  createdAt: string
}
