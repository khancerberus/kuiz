import { useParams } from 'react-router-dom'
import { KButton } from '../components/KButton'
import { Question } from '../components/Question'
import { useQuestions } from '../store/questions'
import { useEffect } from 'react'

export const Game = (): JSX.Element => {
  const { quizId } = useParams()
  const currentQuestion = useQuestions((state) => state.currentQuestion)
  const questions = useQuestions((state) => state.questions)
  const previousQuestion = useQuestions((state) => state.previousQuestion)
  const nextQuestion = useQuestions((state) => state.nextQuestion)

  useEffect(() => {
    console.log('Quiz IDENTIFIER', quizId)
    // Cargar las preguntas del quiz
  })

  if (questions.length === 0) {
    return <div>NO HAY PREGUNTAS</div>
  }

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
          <h3 className="text-2xl">Pregunta - {currentQuestion + 1}</h3>
          <small className="text-sm">(Selecciona 1 alternativa)</small>
        </header>
        <Question />
      </section>

      <footer className="mt-5">
        <KButton
          label="Anterior"
          className="mx-2"
          onClick={previousQuestion}
        />
        <KButton label="Siguiente" className="mx-2" onClick={nextQuestion} />
      </footer>
    </main>
  )
}
