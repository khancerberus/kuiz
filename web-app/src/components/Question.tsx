import { useQuestions } from '../store/questions'

export const Question = (): JSX.Element => {
  const currentQuestion = useQuestions((state) => state.currentQuestion)
  // const questions = useQuestions((state) => state.questions)
  const setSelectedAnswer = useQuestions((state) => state.setSelectedAnswer)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (currentQuestion == null) return

    const option = event.target.value
    setSelectedAnswer(currentQuestion, option)
  }

  return (
    <article>
      <p className="text-xl">{currentQuestion?.description}</p>
      <ul className="">
        {currentQuestion?.options?.map((option, index) => (
          <li key={index} className="flex items-center">
            <input
              type="radio"
              name="answers"
              id={option}
              value={option}
              onChange={onChange}
              checked={currentQuestion?.selectedAnswer === option}
            />
            <label htmlFor={option} className="ml-2">
              {option}
            </label>
          </li>
        ))}
      </ul>
    </article>
  )
}
