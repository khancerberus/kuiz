import { Question } from '../models/question'
import { type Quiz } from '../models/quiz'
import { Score } from '../models/score.model'
import { type TwitchUser } from '../models/twitchUser'

const finishGame = async ({ user, quiz, questions }: { user: TwitchUser, quiz: Quiz, questions: Question[] }): Promise<any> => {
  // Validar que quiz y questions no sean nulos
  if (quiz == null || questions == null) {
    throw new Error('Quiz y questions son requeridos')
  }

  // Validar que quiz y questions sean objetos
  if (typeof quiz !== 'object' || typeof questions !== 'object') {
    throw new Error('Quiz y questions deben ser objetos')
  }

  // Validar que quiz y questions tengan propiedades
  if (Object.keys(quiz).length === 0 || Object.keys(questions).length === 0) {
    throw new Error('Quiz y questions no pueden estar vacíos')
  }

  // Validar que quiz y questions tengan propiedades específicas
  if (quiz.id == null || quiz.name == null || quiz.description == null) {
    throw new Error('Quiz debe tener id, name, description')
  }

  if (questions.some((question) => question.id == null || question.description == null)) {
    throw new Error('Cada pregunta debe tener id, description')
  }

  const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
    const questionWithAnswer = await Question.findOne({
      where: {
        id: question.id
      }
    })

    if (questionWithAnswer == null) {
      throw new Error('Pregunta no encontrada')
    }

    questionWithAnswer.selectedAnswer = question.selectedAnswer
    return questionWithAnswer
  }))

  // Calcular respuestas correctas e incorrectas
  const correctAnswers = questionsWithAnswers.filter(
    (question) => question.answer === question.selectedAnswer
  )
  const incorrectAnswers = questionsWithAnswers.filter(
    (question) => question.answer !== question.selectedAnswer
  )

  // Guardar resultados en la base de datos
  const score = await Score.create({
    goodAnswers: correctAnswers.length,
    badAnswers: incorrectAnswers.length,
    notAnswered: 0, // TODO: Calcular respuestas no respondidas
    playerId: user.privateId,
    quizId: quiz.id
  })
  await score.save()

  return {
    score,
    questions: questionsWithAnswers.map((question => ({
      id: question.id,
      description: question.description,
      options: question.options,
      selectedAnswer: question.selectedAnswer,
      answer: question.answer
    })))
  }
}

export const GameService = {
  finishGame
}
