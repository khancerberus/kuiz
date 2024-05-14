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
    <main className="flex flex-col justify-center items-center gap-5">
      <header>
        <h1 className="font-bold text-6xl">Tu puntuación!</h1>
      </header>

      <section className="border-2 rounded-xl p-5">
        <h2 className="text-lg">
          Preguntas correctas: {results?.score?.goodAnswers}
        </h2>
        <h2 className="text-lg">
          Preguntas incorrectas: {results?.score?.badAnswers}
        </h2>
      </section>

      <section>
        <ul className="flex flex-col gap-10 border-bottom-2">
          {results?.questions.map((question: any) => {
            const isGood = question.selectedAnswer === question.answer

            return (
              <li
                key={question.id}
                className="flex flex-col gap-5 items-center"
              >
                <h2 className="text-3xl">{question.description}</h2>
                <div className="flex flex-col w-96">
                  {isGood
                    ? <>
                      {question.options.map((option: any) => {
                        return (
                          <span
                            key={option}
                            className={
                              option === question.answer
                                ? 'correct-answer'
                                : 'p-2'
                            }
                          >
                            {option}
                          </span>
                        )
                      })}
                    </>
                    : <>
                      {question.options.map((option: any) => {
                        if (option === question.selectedAnswer) {
                          return (
                            <span key={option} className="incorrect-answer">
                              {option}
                            </span>
                          )
                        } else {
                          return (
                            <span
                              key={option}
                              className={
                                option === question.answer
                                  ? 'correct-answer'
                                  : 'p-2'
                              }
                            >
                              {option}
                            </span>
                          )
                        }
                      })}
                    </>
                      }
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
