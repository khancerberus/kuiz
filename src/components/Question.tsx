export const Question = (): JSX.Element => {
  return (
    <article>
      <p className="text-xl">¿Cuál es la capital de Francia?</p>

      <ul className="">
        <li>A) Madrid</li>
        <li>B) París</li> {/* Correct answer */}
        <li>C) Londres</li>
        <li>D) Berlín</li>
      </ul>
    </article>
  )
}
