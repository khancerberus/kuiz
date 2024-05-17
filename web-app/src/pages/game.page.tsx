import { Navigate, useNavigate } from 'react-router-dom'
import { KButton } from '../components/KButton'
import { Question } from '../components/Question'
import { useQuestions } from '../store/questions'
import { useEffect } from 'react'
import { QuestionService } from '../services/question.service'
import { useQuizzes } from '../store/quiz'
import { QuizService } from '../services/quiz.service'
import { useResults } from '../store/results'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import '../index.css'

export const Game = (): JSX.Element => {
  const navigate = useNavigate()
  const currentQuizz = useQuizzes((state) => state.currentQuizz)
  const setCurrentQuizz = useQuizzes((state) => state.setCurrentQuizz)

  const currentQuestion = useQuestions((state) => state.currentQuestion)
  const questions = useQuestions((state) => state.questions)
  const initQuestions = useQuestions((state) => state.initQuestions)
  const previousQuestion = useQuestions((state) => state.previousQuestion)
  const nextQuestion = useQuestions((state) => state.nextQuestion)

  const setResults = useResults((state) => state.setResults)

  const isCompleted = (): boolean => {
    return questions.every((question) => question.selectedAnswer != null)
  }

  const onClickSend = () => {
    QuizService.finishGame({ quiz: currentQuizz, questions })
      .then(({ results }) => {
        setResults(results)
        navigate('/score')
      })
      .catch((error) => {
        console.log(error)
      })
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
          if (error.response.status === 401) {
            setCurrentQuizz(null)
            navigate('/')
          }
        })
    }
  }, [])

  return (
    <>
      {currentQuizz == null
        ? (
          <Navigate to="/" />
          )
        : (
          <main className="flex flex-col items-center justify-center h-screen">
            <section>
              <Question />
            </section>

            <footer className="flex flex-col items-center mt-5">
              <div className="flex gap-5 justify-center items-center">
                <KButton
                  icon={<ChevronLeft />}
                  className="rounded-full"
                  onClick={previousQuestion}
                />

                <span className="w-20 text-center">
                  {questions.findIndex((val) => val.id === currentQuestion?.id) +
                    1 +
                    '/' +
                    questions.length}
                </span>

                <KButton
                  icon={<ChevronRight />}
                  className="rounded-full"
                  onClick={nextQuestion}
                />
              </div>

              <div className="flex justify-center p-10">
                <KButton
                  label="Enviar respuestas"
                  disabled={!isCompleted()}
                  onClick={onClickSend}
                />
              </div>
            </footer>
          </main>
          )}
    </>
  )
}
