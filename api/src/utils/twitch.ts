import axios from 'axios'

export const getAppToken = async () => {
  const response = await axios.post(
    'https://id.twitch.tv/oauth2/token',
    null,
    {
      params: {
        client_id: process.env.AUTH_TWITCH_ID,
        client_secret: process.env.AUTH_TWITCH_SECRET,
        grant_type: 'client_credentials'
      }
    }
  )

  return response.data.access_token
}
