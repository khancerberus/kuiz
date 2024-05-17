import { api } from '../utils/api'

const getToken = async (code: string) => {
  const response = await api.post('/auth', { code })

  return response.data
}

export const AuthService = {
  getToken
}
