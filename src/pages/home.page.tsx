import { useNavigate } from 'react-router-dom'

export const Home = (): JSX.Element => {
  const navigate = useNavigate()

  const goToGame = (): void => {
    navigate('/game')
  }

  return (
    <main>
      <header>
        <h1>Quiz</h1>
      </header>

      <section>
        <h3>Qué es?</h3>
        <p>Un juego de preguntas y respuestas.</p>
      </section>

      <section>
        <button onClick={goToGame}>Jugar</button>
      </section>
    </main>
  )
}
