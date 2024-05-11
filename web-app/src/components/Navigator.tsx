import { Link } from 'react-router-dom'

export const Navigator = (): JSX.Element => {
  return (
    <nav className="fixed flex p-2 gap-8 items-center bg-[#7E2553] w-full">
      {/* <h1 className="text-xl mx-3">Kuiz</h1> */}
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
    </nav>
  )
}
