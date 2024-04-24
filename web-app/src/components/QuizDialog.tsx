import { useNavigate } from 'react-router-dom'
import { KButton } from '../components/KButton'
import { useState } from 'react'
import { type Quiz } from '../types'
import { KDialog } from '../components/KDialog'
import { CircleX } from 'lucide-react'
import { useQuizzes } from '../store/quiz'

export const QuizDialog = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const navigate = useNavigate()
  const setCurrentQuizz = useQuizzes((state) => state.setCurrentQuizz)
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false)

  return (
    <>
      <li
        key={quiz.id}
        className="flex flex-col w-96 border-2 hover:cursor-pointer hover:border-yellow-200"
        onClick={() => {
          setIsDialogOpened(true)
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
      <KDialog
        isOpened={isDialogOpened}
        className="w-3/4 rounded-2xl backdrop:bg-slate-900 backdrop:bg-opacity-20 backdrop:backdrop-blur-md"
      >
        <div className="flex flex-col p-5 w-100 gap-5">
          <header className="flex w-100 justify-between">
            <h3 className="flex text-6xl">{quiz?.name}</h3>
            <button
              onClick={() => {
                setIsDialogOpened(false)
              }}
              className="flex justify-center items-center w-12 h-12 text-3xl hover:text-red-500 transition-all duration-200 rounded-sm"
            >
              <CircleX />
            </button>
          </header>

          <section>
            <p>{quiz?.description}</p>
            <p>Creado por: {quiz?.owner}</p>
          </section>

          <footer>
            <KButton
              label="Jugar"
              onClick={() => {
                navigate('/game')
                setCurrentQuizz(quiz)
              }}
            />
          </footer>
        </div>
      </KDialog>
    </>
  )
}
