import { useNavigate } from 'react-router-dom'
import { KButton } from '../components/KButton'
import { useState } from 'react'
import { type Quiz } from '../types'
import { KDialog } from '../components/KDialog'
import { ChevronRight } from 'lucide-react'
import { useQuizzes } from '../store/quiz'
import { format } from '@formkit/tempo'

export const QuizDialog = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const navigate = useNavigate()
  const setCurrentQuizz = useQuizzes((state) => state.setCurrentQuizz)
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false)

  return (
    <>
      <li
        key={quiz?.id}
        className="flex bg-[#121b34] rounded-lg p-5 items-center justify-between"
      >
        <div className="flex flex-col p-1">
          <h4 className="text-4xl font-bold text-[#FAEF5D]">{quiz?.name}</h4>
          <p className="text-lg">{quiz?.description}</p>
          <p className="text-sm text-slate-400 mt-3">
            Creado por: {quiz?.owner?.twitchId}
          </p>
          <p className="text-sm text-slate-400">
            Fecha creación: {format(quiz?.createdAt, 'short', 'cl')}
          </p>
          <p className="text-sm text-slate-400">
            Última actualización: {format(quiz?.updatedAt, 'short', 'cl')}
          </p>
        </div>
        <div className="flex flex-col p-1">
          <KButton
            icon={<ChevronRight />}
            onClick={() => {
              setIsDialogOpened(true)
            }}
          />
        </div>
      </li>

      <KDialog
        isOpened={isDialogOpened}
        onHide={() => { setIsDialogOpened(false) }}
        title={quiz?.name}
      >
        <section>
          <p className="text-2xl">{quiz?.description}</p>
          <p className="text-slate-400">Creado por: {quiz?.owner?.twitchId}</p>
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
      </KDialog>
    </>
  )
}
