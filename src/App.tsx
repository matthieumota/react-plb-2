import { useEffect, useState } from 'react'
import Book, { type Book as BookType } from './Book'
import Button from './Button'
import BookForm from './BookForm'
import Clock from './Clock'
import axios from 'axios'
import { Outlet } from 'react-router'

let nextId = 11
export const BOOKS = [
  {
    id: 1,
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    year: 1954,
    image: '/assets/le-seigneur-des-anneaux.jpg',
  },
  {
    id: 2,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    image: '/assets/le-petit-prince.jpg',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    image: '/assets/1984.jpeg',
  },
  {
    id: 4,
    title: 'L\'Étranger',
    author: 'Albert Camus',
    year: 1942,
    image: '/assets/l-etranger.jpg',
  },
  {
    id: 5,
    title: 'Harry Potter à l\'école des sorciers',
    author: 'J.K. Rowling',
    year: 1997,
    image: '/assets/harry-potter-a-l-ecole-des-sorciers.jpg',
  },
  {
    id: 6,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    year: 1953,
    image: '/assets/fahrenheit-451.jpg',
  },
  {
    id: 7,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    year: 1862,
    image: '/assets/les-miserables.jpg',
  },
  {
    id: 8,
    title: 'Orgueil et Préjugés',
    author: 'Jane Austen',
    year: 1813,
    image: '/assets/orgueil-et-prejuges.jpg',
  },
  {
    id: 9,
    title: 'Le Comte de Monte-Cristo',
    author: 'Alexandre Dumas',
    year: 1844,
    image: '/assets/le-comte-de-monte-cristo.jpeg',
  },
  {
    id: 10,
    title: 'La Peste',
    author: 'Albert Camus',
    year: 1947,
    image: '/assets/la-peste.jpg',
  }
]
export const AUTHORS = new Set(BOOKS.map(b => b.author))

function App() {
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const [selectedBookId, setSelectedBookId] = useState<number>()
  const [selectedBook, setSelectedBook] = useState<BookType>()
  const [selectedBookLoading, setSelectedBookLoading] = useState(false)
  // @todo montrer l'intérêt du useMemo
  const [showForm, setShowForm] = useState(false)
  const [newBook, setNewBook] = useState<BookType>({
    id: 0,
    title: '',
    author: Array.from(AUTHORS)[0],
    year: 0,
    image: '',
  })

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))

      try {
        const response = await axios.get('http://localhost:3000/books')
        setBooks(response.data)
      } catch (error: any) {
        setError(error.message)
      }

      setLoading(false)
    }

    loadBooks()
  }, [])

  // Créer un useEffect qui se déclenche si selectedBook change...
  // Vérifier que le selectedBook est défini...
  // S'il existe, on fait un get sur http://localhost:3000/books/8 où 8 est l'id du selectedBook
  // Faire un console.log du livre
  // Au mieux, remplacer selectedBook par les données de l'api et ajouter un skeleton en chargement
  useEffect(() => {
    console.log('selectedBookId', selectedBookId)
    if (!selectedBookId) return

    const loadBook = async (id: number) => {
      setSelectedBookLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`)
        console.log(response.data)
        setSelectedBook(response.data)
      } catch {}
      setSelectedBookLoading(false)
    }

    loadBook(selectedBookId)
  }, [selectedBookId])

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleAddBook = async () => {
    try {
      // @todo mettre un loader sur le bouton le temps que la requete soit faite
      await new Promise(resolve => setTimeout(resolve, 2000))
      const response = await axios.post('http://localhost:3000/books', { ...newBook, id: (nextId++).toString() })
      setBooks(prevBooks => [
        ...prevBooks,
        response.data
      ])
      setNewBook({ id: 0, title: '', author: '', year: 0, image: '' })
      toggleForm()
    } catch (err: any) {
      setError('Erreur lors de l’ajout du livre : ' + err.message)
    }
  }

  const handleRemoveBook = async (book: BookType) => {
    try {
      await axios.delete(`http://localhost:3000/books/${book.id}`)
      setBooks(books.filter(b => b.id !== book.id))
    } catch (err: any) {
      setError('Erreur lors de la suppression : ' + err.message)
    }
  }

  const handleUpdateBook = async (localBook: BookType) => {
    try {
      await axios.put(`http://localhost:3000/books/${localBook.id}`, localBook)
      setBooks(books.map(b => b.id === localBook.id ? localBook : b))
    } catch (err: any) {
      setError('Erreur lors de la mise à jour : ' + err.message)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <Outlet />

        <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Bookorama</h1>

        {selectedBook && <div className="flex justify-center mb-4">
          <div className="w-1/3">
            {selectedBookLoading ? <>
              <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200">
                <div className="h-64 bg-gray-200 w-full animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 w-28 animate-pulse rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 w-32 animate-pulse rounded-lg mb-2"></div>
                  <div className="h-4 bg-gray-200 w-24 animate-pulse rounded-lg mb-2"></div>
                </div>
              </div>
            </> : <Book
              book={selectedBook}
              onSelect={() => setSelectedBookId(Number(selectedBook.id) + 1)}
              selected
              key={selectedBook.id}
              onRemove={() => {
                handleRemoveBook(selectedBook)
                setSelectedBookId(undefined)
              }}
              onSave={(localBook) => {
                handleUpdateBook(localBook)
                setSelectedBookId(localBook.id)
              }}
            />}
          </div>
        </div>}

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
            <span className="ml-4 text-blue-500 font-medium">Chargement des livres...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto mb-4">
            <strong className="font-bold">Erreur :</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {books.map(book =>
            <Book
              key={book.id}
              book={book}
              onSelect={() => setSelectedBookId(selectedBook && selectedBook.id === book.id ? undefined : book.id)}
              active={!selectedBook || selectedBook.id !== book.id}
              onRemove={() => handleRemoveBook(book)}
              onSave={handleUpdateBook}
            />
          )}
        </div>

        {!showForm && <div className="text-center py-10">
          <Button onClick={toggleForm}>
            Ajouter un livre
          </Button>
        </div>}

        {showForm && <div className="mt-4">
          <Clock
            onTest={() => console.log('test')}
          />
          <pre>{JSON.stringify(newBook, null, 2)}</pre>
          <BookForm
            book={newBook}
            onCancel={toggleForm}
            onChange={(book: BookType) => setNewBook(book)}
            onSave={handleAddBook}
          />
        </div>}
      </div>
    </div>
  )
}

export default App
