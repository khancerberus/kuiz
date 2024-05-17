import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUser } from '../hooks/useUser'

export const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const ApiInterceptor = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { setUser } = useUser()

  useEffect(() => {
    api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')

      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    async (error) => {
      return await Promise.reject(error)
    })

    const apiInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token')
          setUser(null)
        }

        return await Promise.reject(error)
      }
    )

    setIsLoaded(true)

    return () => {
      api.interceptors.response.eject(apiInterceptor)
    }
  }, [])

  return isLoaded && children
}
