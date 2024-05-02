import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home.page'
import { Layout } from './components/Layout'
import { Error404 } from './components/Error404'
import { Game } from './pages/game.page'
import { ErrorHandler } from './components/ErrorHandler'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/game',
        element: <Game />
      }
    ],
    errorElement: <ErrorHandler />
  },
  {
    path: '*',
    element: <Error404 />
  }
])

function App(): JSX.Element {
  return <RouterProvider router={router} />
}

export default App
