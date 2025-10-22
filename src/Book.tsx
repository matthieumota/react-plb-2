import { useState } from 'react'
import Button from './Button'

export type Book = {
  id: number
  title: string
  author: string
  year: number
  image?: string
}

type BookProps = {
  book: Book
  active?: boolean
  onSelect: () => void
  selected?: boolean
}

function Book({ book, active = true, onSelect, selected = false }: BookProps) {
  const [like, setLike] = useState(0)

  const handleLike = () => {
    console.log('je fais un appel api...')
    setLike(p => p + 1) // 1
    setLike(p => p + 1) // 2
    setLike(p => p + 1) // 3
    console.log(`setLike(${like} + 1)`)
    console.log('je fais un autre truc...')
  }

  const handleSee = () => {
    onSelect()
  }

  if (!active) return

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
      {book.image ? <img
        src={book.image}
        alt={`Couverture de ${book.title}`}
        className="w-full h-64 object-cover"
      /> : "Pas d'image"}
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800">{book.title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
        <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>

        <Button onClick={handleSee}>
          {selected ? 'Annuler' : 'Voir'}
        </Button>
        <Button onClick={handleLike}>
          ❤️‍🔥
          {like > 0 && <>({like})</>}
        </Button>
      </div>
    </div>
  )
}

export default Book
