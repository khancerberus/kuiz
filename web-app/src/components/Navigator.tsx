import { Link } from 'react-router-dom'

export const Navigator = (): JSX.Element => {
  return (
    <nav className="flex items-center bg-slate-700 w-screen">
      <h1 className="text-xl mx-3">Kuiz</h1>
      <ul className="flex">
        <li className="mx-2">
          <Link to="/">Home</Link>
        </li>

        <li className="mx-2">
          <Link to="#">About</Link>
        </li>
      </ul>
    </nav>
  )
}
