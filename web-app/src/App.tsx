import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home.page'
import { Layout } from './components/Layout'
import { Error404 } from './components/Error404'
import { Game } from './pages/game.page'
import { ErrorHandler } from './components/ErrorHandler'
import { ScorePage } from './pages/score.page'
import { Auth } from './pages/auth.page'
import { UserContextProvider } from './contexts/userContext'
import { ApiInterceptor } from './utils/api'

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
      },
      {
        path: '/score',
        element: <ScorePage />
      }
    ],
    errorElement: <ErrorHandler />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  {
    path: '*',
    element: <Error404 />
  }
])

function App(): JSX.Element {
  return (
    <UserContextProvider>
      <ApiInterceptor>
        <RouterProvider router={router} />
      </ApiInterceptor>
    </UserContextProvider>
  )
}

export default App
