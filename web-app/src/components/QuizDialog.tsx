import { useNavigate } from 'react-router-dom'
import { KButton } from '../components/KButton'
import { useState } from 'react'
import { type Score, type Quiz } from '../types'
import { KDialog } from '../components/KDialog'
import { CheckCircle, ChevronRight, XCircle } from 'lucide-react'
import { useQuizzes } from '../store/quiz'
import { format } from '@formkit/tempo'
import { QuizService } from '../services/quiz.service'

export const QuizDialog = ({ quiz }: { quiz: Quiz }): JSX.Element => {
  const navigate = useNavigate()
  const setCurrentQuizz = useQuizzes((state) => state.setCurrentQuizz)
  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false)
  const [scores, setScores] = useState<Score[]>([])

  return (
    <>
      <li
        key={quiz?.id}
        className="flex bg-[#121b34] border-b-2 border-slate-600 rounded-lg p-5 items-center justify-between"
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
              QuizService.getScores(quiz.id)
                .then((scores: Score[]) => {
                  setScores(scores)
                })
                .catch((error) => {
                  console.error(error)
                })
            }}
          />
        </div>
      </li>

      <KDialog
        isOpened={isDialogOpened}
        onHide={() => {
          setIsDialogOpened(false)
        }}
        title={quiz?.name}
      >
        <section>
          <p className="text-2xl">{quiz?.description}</p>
          <p className="text-slate-400">Creado por: {quiz?.owner?.twitchId}</p>
        </section>

        <section className="flex flex-col py-5">
          <h4 className="pb-3 text-4xl font-bold">
            Mis resultados anteriores
          </h4>
          <p className="flex text-3xl font-bold w-full">Fecha</p>
          <ul className="flex flex-col overflow-auto h-36 pe-2 text-2xl">
            {scores.map((score, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-slate-700"
              >
                <p>
                  {format(
                    score?.createdAt,
                    { date: 'short', time: 'short' },
                    'cl'
                  )}
                </p>
                <p className="flex items-center gap-5">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="text-green-500" size={20} />
                    {score?.goodAnswers}
                  </span>

                  <span className="flex items-center gap-1">
                    <XCircle className="text-red-500" size={20} />
                    {score?.badAnswers}
                  </span>
                </p>
              </li>
            ))}
          </ul>
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
