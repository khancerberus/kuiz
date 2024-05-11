import { useQuestions } from '../store/questions'

export const Question = (): JSX.Element => {
  const currentQuestion = useQuestions((state) => state.currentQuestion)
  // const questions = useQuestions((state) => state.questions)
  const setSelectedAnswer = useQuestions((state) => state.setSelectedAnswer)

  const onChange = (option: string) => (): void => {
    if (currentQuestion == null) return
    setSelectedAnswer(currentQuestion, option)
  }

  return (
    <article className="flex flex-col p-5 gap-5">
      <h3 className="text-2xl">{currentQuestion?.description}</h3>
      <ul className="flex flex-col">
        {currentQuestion?.options?.map((option, index) => (
          <li
            key={index}
            className={
              currentQuestion.selectedAnswer === option
                ? 'selected-answer'
                : 'unselected-answer'
            }
            onClick={onChange(option)}
          >
            <label htmlFor={option} className="ml-2">
              {option}
            </label>
          </li>
        ))}
      </ul>
    </article>
  )
}
