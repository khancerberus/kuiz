import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { KButton } from './KButton'
import { Twitch } from 'lucide-react'

export const Navigator = (): JSX.Element => {
  const { user } = useUser()
  return (
    <nav className="fixed flex p-2 gap-8 items-center bg-[#4d1633] w-full">
      <Link to="/">
        <img src="/logo-white.png" alt="logo" width={100} />
      </Link>

      <ul className="flex gap-3">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="#">About</Link>
        </li>
      </ul>

      {user != null
        ? (
            <div className="ml-auto">
              <img src={user.avatar} width={30} className="rounded-full"/>
            </div>
          )
        : (
            <Link
              className="ml-auto"
              to="https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=2bdunr06xq4c695npyrlmeqe1vtb5c&redirect_uri=http://localhost:5173/auth&scope=user%3Aread%3Aemail"
            >
              <KButton
                label="Iniciar sesión"
                className=""
                icon={<Twitch />}
              />
            </Link>
          )}
    </nav>
  )
}
