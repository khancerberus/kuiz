import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { QuizService } from '../services/quiz.service'
import { type Quiz } from '../types'
import { useQuizzes } from '../store/quiz'
import { QuizDialog } from '../components/QuizDialog'

export const Home = (): JSX.Element => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const currentQuiz = useQuizzes((state) => state.currentQuizz)

  useEffect(() => {
    QuizService.getAll()
      .then((quizzes) => {
        setQuizzes(quizzes) // ✅
      })
      .catch((error) => {
        console.error(error) // ❌
      })
  }, [])

  if (currentQuiz != null) return <Navigate to="/game" />

  return (
    <main className="flex flex-col justify-center items-center gap-5">
      <header>
        <h1 className="text-6xl">Kuiz Game</h1>
      </header>

      <section>
        <h3 className="text-2xl">Qué es?</h3>
        <p>Un juego de preguntas y respuestas.</p>
      </section>

      <section className="flex flex-col border border-gray-500 p-5">
        <h3 className="text-3xl">Quizzes</h3>
        <ul className="flex flex-wrap gap-5 mt-5">
          {quizzes.map((quiz, index) => (
            <QuizDialog key={index} quiz={quiz} />
          ))}
        </ul>
      </section>
    </main>
  )
}
