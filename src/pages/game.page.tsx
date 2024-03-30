import { useState } from 'react'
import { KButton } from '../components/KButton'
import { Question } from '../components/Question'

export const Game = (): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = useState(<Question />)

  return (
    <main className="flex flex-col items-center justify-center p-5">
      <header className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-5xl">Kuiz</h1>
        <p className="max-w-80 md:max-w-lg my-2">
          Responda las preguntas seleccionando 1 o más alternativas dependiendo
          de las reglas de cada pregunta
        </p>
      </header>

      <section>
        <header className="mb-5">
          <h3 className="text-2xl">Pregunta [1]</h3>
          <small className="text-sm">(Selecciona 1 alternativa)</small>
        </header>

        {currentQuestion}
      </section>

      <footer className="mt-5">
        <KButton label="Anterior" className="mx-2" />
        <KButton label="Siguiente" className="mx-2" />
      </footer>
    </main>
  )
}
