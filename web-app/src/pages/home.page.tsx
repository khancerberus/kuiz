import { useNavigate } from 'react-router-dom'
import { KButton } from '../components/KButton'
import './home.page.css'
import { useEffect, useState } from 'react'
import { QuizService } from '../services/quiz.service'
import { type Quiz } from '../types'

export const Home = (): JSX.Element => {
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  const goToGame = (): void => {
    navigate('/game')
  }

  useEffect(() => {
    QuizService.getAll()
      .then((quizzes) => {
        setQuizzes(quizzes) // ✅
      })
      .catch((error) => {
        console.error(error) // ❌
      })
  }, [])

  return (
    <main className="flex flex-col justify-center items-center gap-5">
      <header>
        <h1 className="text-6xl">Kuiz Game</h1>
      </header>

      <section>
        <h3 className="text-2xl">Qué es?</h3>
        <p>Un juego de preguntas y respuestas.</p>
      </section>

      {/* <section>
        <KButton label="Jugar" onClick={goToGame} />
      </section> */}

      <section className="flex flex-col border border-gray-500 p-5">
        <h3 className="text-3xl">Quizzes</h3>
        <ul className="flex flex-wrap gap-5 mt-5">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="flex flex-col w-96 border-2 hover:cursor-pointer hover:border-yellow-200"
              onClick={() => {
                navigate(`/game/${quiz.id}`)
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOPEYi23lfCAAtcL0yqDQvifmjX3dNCWol6LVd5vcZ1A&s"
                alt="Cover Quiz"
                className="w-full h-40 object-cover"
              />
              <div className="flex flex-col gap-3 p-2">
                <h4 className="text-4xl font-bold my-3">{quiz.name}</h4>
                <p className="text-sm">{quiz.description}</p>
                <p>Creado por: {quiz.owner}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
