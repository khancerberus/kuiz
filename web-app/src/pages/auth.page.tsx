import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthService } from '../services/auth.service'
import { useUser } from '../hooks/useUser'

export const Auth = (): JSX.Element => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const { setUser } = useUser()

  useEffect(() => {
    setSearchParams('')

    AuthService.getToken(searchParams.get('code') ?? '').then((data: any) => {
      localStorage.setItem('token', String(data.token))
      setUser(data.user)
    }).catch((error) => {
      console.log(error)
    })

    navigate('/')
  }, [])

  return (
    <>
      <h1>Auth</h1>
      <div>{searchParams.get('code')}</div>
    </>
  )
}
