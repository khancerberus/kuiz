import { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { TwitchService } from '../services/twitch.service'

interface UserContextProps {
  children: React.ReactNode
}

interface UserContextValue {
  user?: any
  setUser?: any
}

export const UserContext = createContext<UserContextValue>({})

export const UserContextProvider = (props: UserContextProps) => {
  const [user, setUser] = useState()

  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   const user = jwtDecode(token)
  //   console.log('user from token', user)

  //   TwitchService.getUser(String(user.userId)).then((user: any) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //     setUser(user)
  //     console.log('user from twitch', user)
  //   }).catch((error: any) => {
  //     console.log(error)
  //   })
  // }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}
