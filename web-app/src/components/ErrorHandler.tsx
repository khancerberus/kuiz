import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export const ErrorHandler = (): JSX.Element => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Error Handler</h1>

        <p>{error?.status}</p>
        <p>{error?.statusText}</p>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error Handler</h1>

        <p>{error?.message}</p>
      </div>
    )
  }

  return <div>Error desconocido</div>
}
