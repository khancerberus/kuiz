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
  id: string
  description: string
  options: string[]
  correct?: number
  selectedAnswer: string | null
}
