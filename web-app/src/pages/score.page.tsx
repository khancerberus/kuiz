import { useEffect } from 'react'
import { useResults } from '../store/results'
import { useQuizzes } from '../store/quiz'
import { useQuestions } from '../store/questions'

export const ScorePage = () => {
  const results = useResults((state) => state.results)
  const setCurrentQuizz = useQuizzes((state) => state.setCurrentQuizz)
  const resetQuestions = useQuestions((state) => state.resetQuestions)

  useEffect(() => {
    setCurrentQuizz(null)
    resetQuestions()
  }, [])

  return (
    <div>
      <h1>Score Page</h1>
      <section>
        <ul>
          {results?.questions.map((question: any) => {
            const isGood = question.selectedAnswer === question.answer

            return (
              <li key={question.id} className="my-5 p-5">
                <h2>{question.description}</h2>
                <div className="flex flex-col">
                  {isGood ? (
                    <>
                      {question.options.map((option: any) => {
                        return (
                          <span
                            key={option}
                            className={
                              option === question.answer && 'text-green-500'
                            }
                          >
                            {option}
                          </span>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      {question.options.map((option: any) => {
                        if (option === question.selectedAnswer) {
                          return (
                            <span key={option} className="text-red-500">{option}</span>
                          )
                        } else {
                          return (
                            <span
                              key={option}
                              className={
                                option === question.answer && 'text-green-500'
                              }
                            >
                              {option}
                            </span>
                          )
                        }
                      })}
                    </>
                  )}
                </div>
              </li>
            )
          })
          }
        </ul>
      </section>
    </div>
  )
}
