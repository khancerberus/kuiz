import axios from 'axios'
import { getAppToken } from '../../utils/twitch'

export class TwitchService {
  getUser = async (twitchId: string) => {
    const token = await getAppToken()

    console.log('token', token)

    const response = await axios.get(
      `https://api.twitch.tv/helix/users?id=${twitchId}`,
      {
        headers: {
          'Client-Id': process.env.AUTH_TWITCH_ID,
          Authorization: `Bearer ${token}`
        }
      }
    )

    const user = response.data.data[0]

    return {
      username: user.display_name,
      avatar: user.profile_image_url
    }
  }
}
