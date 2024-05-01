import { Navigate } from 'react-router-dom'
import { KButton } from '../components/KButton'
import { Question } from '../components/Question'
import { useQuestions } from '../store/questions'
import { useEffect } from 'react'
import { QuestionService } from '../services/question.service'
import { useQuizzes } from '../store/quiz'
import { QuizService } from '../services/quiz.service'

export const Game = (): JSX.Element => {
  const currentQuizz = useQuizzes((state) => state.currentQuizz)

  const currentQuestion = useQuestions((state) => state.currentQuestion)
  const questions = useQuestions((state) => state.questions)
  const initQuestions = useQuestions((state) => state.initQuestions)
  const previousQuestion = useQuestions((state) => state.previousQuestion)
  const nextQuestion = useQuestions((state) => state.nextQuestion)

  const isCompleted = (): boolean => {
    return questions.every((question) => question.selectedAnswer != null)
  }

  useEffect(() => {
    // Cargar las preguntas del quiz
    if (currentQuizz != null) {
      QuestionService.getByQuizId({ quizId: currentQuizz.id })
        .then((questions) => {
          initQuestions(questions)
        })
        .catch((error) => {
          console.error('Error al cargar las preguntas', error)
        })
    }
  }, [])

  if (currentQuizz == null) {
    return <Navigate to="/" />
  }

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

      <footer className="flex flex-col justify-center align-middle content-center mt-5">
        <div>
          <KButton
            label="Anterior"
            className="mx-2 border p-1"
            onClick={previousQuestion}
          />
          <KButton
            label="Siguiente"
            className="mx-2 border p-1"
            onClick={nextQuestion}
          />
        </div>

        <div className="flex justify-center p-10">
          <button
            className="p-3 bg-green-700 hover:bg-green-900 disabled:bg-slate-700 disabled:text-gray-400"
            disabled={!isCompleted()}
            onClick={() => {
              QuizService.finishGame({ quiz: currentQuizz, questions })
                .then((correctAnswers) => {
                  console.log(correctAnswers)
                }).catch((error) => {
                  console.log(error)
                })
            }}
          >
            Enviar
          </button>
        </div>
      </footer>
    </main>
  )
}
