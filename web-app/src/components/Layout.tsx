import { Outlet } from 'react-router-dom'
import { Navigator } from './Navigator'

export const Layout = (): JSX.Element => {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  )
}
