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
        setQuizzes(quizzes)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  if (currentQuiz != null) return <Navigate to="/game" />

  return (
    <main className="flex flex-col justify-center items-center gap-5">
      <section className="flex flex-col items-center p-10 gap-10">
        <h3 className="text-5xl">Todos los quizzes</h3>
        <ul className="flex flex-col gap-2">
          {quizzes.map((quiz, index) => (
            <QuizDialog key={index} quiz={quiz} />
          ))}
        </ul>
      </section>
    </main>
  )
}
