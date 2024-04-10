import { useNavigate } from 'react-router-dom'
import { KButton } from '../components/KButton'
import './home.page.css'

export const Home = (): JSX.Element => {
  const navigate = useNavigate()

  const goToGame = (): void => {
    navigate('/game')
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <header>
        <h1 className="text-6xl">Kuiz Game</h1>
      </header>

      <section>
        <h3 className="text-2xl">Qué es?</h3>
        <p>Un juego de preguntas y respuestas.</p>
      </section>

      <section>
        <KButton label="Jugar" onClick={goToGame} />
      </section>
    </main>
  )
}
