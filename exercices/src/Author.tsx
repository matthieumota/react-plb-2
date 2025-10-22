export type Author = {
  id: number
  name: string
  birthday: Date
}

type AuthorProps = {
  author: Author
}

function Author({ author }: AuthorProps) {
  const age = new Date().getFullYear() - author.birthday.getFullYear()

  return (
    <div className="border rounded-lg p-2">
      <h2>{author.name}</h2>
      <p>Né le {author.birthday.toLocaleDateString()}</p>
      {age > 100 && <p>L'auteur a plus de 100 ans</p>}
    </div>
  )
}

export default Author
