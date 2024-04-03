import { Frown } from 'lucide-react'

export const Error404 = (): JSX.Element => {
  return (
    <main className="flex w-screen h-screen justify-center content-center">
      <section className="flex flex-col justify-center content-center text-center">
        <Frown size={150} className="w-full my-5" />
        <h1 className="text-6xl">404</h1>
        <h2 className="text-3xl">Not found</h2>
        <div className="flex justify-center">
          <p className="w-3/4 py-5">
            Esta página no se ha encontrado! Por favor reintente con otra ruta...
          </p>
        </div>
      </section>
    </main>
  )
}
