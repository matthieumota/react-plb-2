import { NavLink, useParams, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import type { Book } from '../Book'
import axios from 'axios'

function BookSingle() {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [book, setBook] = useState<Book>()
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadBook = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/books/${params.id}`)
            setBook(response.data)
        } catch (error: any) {
            // On affiche une 404 ou on redirige
            setNotFound(true)
        }
    }

    loadBook()
  }, [params.id])

  if (notFound) {
    return <h1>404</h1>
  }

  return book && (
    <div className="flex gap-8 mt-8">
      {searchParams.get('a')}
      {searchParams.get('b')}
      <button onClick={() => {
        searchParams.set('b', '2')
        setSearchParams(searchParams)
      }}>
        Ajouter un parametre b
      </button>
      <button onClick={() => {
        searchParams.delete('b')
        setSearchParams(searchParams)
      }}>
        Retirer un parametre b
      </button>
      {book.image &&
        <div className="w-1/2">
          <img
            src={book.image}
            alt={`Couverture de ${book.title}`}
            className="w-full object-cover"
          />
        </div>
      }
      <div className="w-1/2">
        <h1 className="text-xl font-semibold text-gray-800">{book.title}</h1>
        <h2 className="text-md text-gray-600 mb-2">{book.author}</h2>
        <p className="text-sm text-gray-500 mb-2">Publié en {book.year}</p>
      </div>

      <NavLink to="/livre/5">test</NavLink>
    </div>
  )
}

export default BookSingle
