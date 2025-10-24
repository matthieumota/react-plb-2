import { useState } from 'react'
import Button from './Button'
import { AUTHORS } from './App'
import { cn } from './utils'
import { NavLink, useNavigate } from 'react-router'

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
  onRemove: () => void
  onSave: (book: Book) => void
}

function Book({ book, active = true, onSelect, selected = false, onRemove, onSave }: BookProps) {
  const navigate = useNavigate()
  const [like, setLike] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [localBook, setLocalBook] = useState(book)
  const [errors, setErrors] = useState<Record<string, string>>({})

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

  const handleRemove = () => {
    onRemove()
  }

  const toggleEdit = () => {
    setEditMode(!editMode)

    if (!editMode) { // reset du formulaire
      setLocalBook(book)
      setErrors({})
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLocalBook({ ...localBook, [event.target.name]: event.target.value })
  }

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault()

    const errors: Record<string, string> = {}

    if (!localBook.title) {
      errors.title = 'Le titre est obligatoire'
    }

    if (!localBook.year) {
      errors.year = `L'année est obligatoire`
    }

    if (localBook.year < 1900 || localBook.year > 2023) {
      errors.year = `L'année n'est pas correcte`
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return
    }

    onSave(localBook)
    setEditMode(false)
  }

  if (!active) return

  if (editMode) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
        <div className="p-4">
          <form onSubmit={handleSave}>
            <div className="mb-2">
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                type="text"
                className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.title && 'border-red-500')}
                value={localBook.title}
                name="title"
                onChange={handleChange}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="author">Auteur</label>
              <select
                id="author"
                className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.author && 'border-red-500')}
                value={localBook.author}
                name="author"
                onChange={handleChange}
              >
                {Array.from(AUTHORS).map(author =>
                  <option key={author} value={author}>{author}</option>
                )}
              </select>
              {errors.author && <p className="text-red-500">{errors.author}</p>}
            </div>

            <div className="mb-2">
              <label htmlFor="year">Année</label>
              <input
                id="year"
                type="number"
                className={cn('border border-gray-300 rounded-md py-1 px-2 w-full', errors.year && 'border-red-500')}
                value={localBook.year}
                name="year"
                onChange={handleChange}
              />
              {errors.year && <p className="text-red-500">{errors.year}</p>}
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button title="Annuler" onClick={toggleEdit} className="bg-red-500 hover:bg-red-800" type="button">
                Annuler
              </Button>
              <Button title="Sauvegarder">
                Sauvegarder
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }

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
        <Button title="Supprimer" onClick={handleRemove} className="bg-red-500 hover:bg-red-800">
          🗑️
        </Button>
        <Button title="Modifier" onClick={toggleEdit}>
          Modifier
        </Button>
        <Button title="Visiter" onClick={() => navigate(`/livre/${book.id}`)}>
          Visiter
        </Button>
        <NavLink to={`/livre/${book.id}`} className="bg-blue-500 hover:bg-blue-800 text-white py-1.5 px-4 rounded-md duration-300">
          Visiter
        </NavLink>
      </div>
    </div>
  )
}

export default Book
