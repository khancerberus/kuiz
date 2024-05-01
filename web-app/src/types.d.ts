export interface TwitchUser {
  twitchId: string
}

export interface Quiz {
  id: string
  name: string
  description: string
  owner: TwitchUser
}

interface Question {
  description: string
  options: string[]
  correct?: number
  selectedAnswer: number | null
}
