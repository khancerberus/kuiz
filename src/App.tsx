import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home.page'
import { Layout } from './components/Layout'
import { Error404 } from './components/Error404'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
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
