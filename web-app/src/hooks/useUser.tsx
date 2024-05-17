import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

export const useUser = () => {
  const context = useContext(UserContext)
  if (context == null) {
    throw new Error('useUser debe estar dentro del UserContextProvider')
  }
  return context
}
