import { api } from '../utils/api'

const getUser = async (twitchId: string) => {
  const { data } = await api.get(`/twitch/user/${twitchId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  return data
}

export const TwitchService = {
  getUser
}
