import { BookCard } from '@/components/book-card'
import { Input } from '@/components/input'
import { useAuth } from '@/hooks/use-auth'
import { useDebounce } from '@/hooks/use-debounce'
import { IBook } from '@/interfaces/IBook'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import { Book, BookMarked, LogOut, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

async function getUserBooks() {
  try {
    const booksResponse = await api.get('/books/user/all')

    return booksResponse.data
  } catch (error) {
    console.log(error) // ADD ERROR TREATMENT
  }
} // PROD

async function getSearchBooks(bookTitle: string) {
  interface DataType {
    api_id: string
    title: string
    publishedDate: Date
    publisher: string
    summary: string
    totalPages: number
    author: string
    poster_url: string
  }

  try {
    const booksResponse = await api.get(`/books/${bookTitle}`)

    const data: DataType[] = booksResponse.data
    const formattedData = data.map((book) => {
      const { api_id: givenID, ...bookWithoutID } = {
        ...book,
        author: { name: book.author, id: 0 },
      }

      return { ...bookWithoutID, id: givenID }
    })

    return formattedData
  } catch (err) {
    console.log(err)
  }
}

// async function getUserBooks() {
//   return [
//     {
//       id: 1,
//       title: 'A Revolução dos Bichos',
//       publishedDate: new Date('1945-08-17'),
//       publisher: 'Secker & Warburg',
//       summary:
//         'Um grupo de animais de uma fazenda se rebela contra seus donos humanos, estabelecendo um regime próprio, que rapidamente se corrompe.',
//       totalPages: 112,
//       author: {
//         id: 1,
//         name: 'George Orwell',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 2,
//       title: '1984',
//       publishedDate: new Date('1949-06-08'),
//       publisher: 'Secker & Warburg',
//       summary:
//         'Um clássico da literatura distópica que explora a vigilância totalitária, a repressão política e a manipulação da verdade.',
//       totalPages: 328,
//       author: {
//         id: 1,
//         name: 'George Orwell',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 3,
//       title: 'O Hobbit',
//       publishedDate: new Date('1937-09-21'),
//       publisher: 'George Allen & Unwin',
//       summary:
//         'Bilbo Bolseiro embarca em uma aventura inesperada com um grupo de anões para recuperar um tesouro guardado pelo dragão Smaug.',
//       totalPages: 310,
//       author: {
//         id: 2,
//         name: 'J.R.R. Tolkien',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 4,
//       title: 'Dom Quixote',
//       publishedDate: new Date('1605-01-16'),
//       publisher: 'Francisco de Robles',
//       summary:
//         'A história de um cavaleiro que se perde em um mundo de fantasia e realiza feitos heroicos imaginários.',
//       totalPages: 992,
//       author: {
//         id: 3,
//         name: 'Miguel de Cervantes',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 5,
//       title: 'Orgulho e Preconceito',
//       publishedDate: new Date('1813-01-28'),
//       publisher: 'T. Egerton, Whitehall',
//       summary:
//         'A história de Elizabeth Bennet enquanto ela lida com questões de moralidade, educação, casamento e riqueza.',
//       totalPages: 279,
//       author: {
//         id: 4,
//         name: 'Jane Austen',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 6,
//       title: 'Moby Dick',
//       publishedDate: new Date('1851-10-18'),
//       publisher: 'Richard Bentley',
//       summary:
//         'A busca obsessiva do Capitão Ahab pela grande baleia branca, Moby Dick.',
//       totalPages: 635,
//       author: {
//         id: 5,
//         name: 'Herman Melville',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 7,
//       title: 'O Senhor dos Anéis: A Sociedade do Anel',
//       publishedDate: new Date('1954-07-29'),
//       publisher: 'George Allen & Unwin',
//       summary:
//         'A primeira parte da épica trilogia de fantasia, onde Frodo Bolseiro inicia sua jornada para destruir o Um Anel.',
//       totalPages: 423,
//       author: {
//         id: 2,
//         name: 'J.R.R. Tolkien',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 8,
//       title: 'Crime e Castigo',
//       publishedDate: new Date('1866-01-01'),
//       publisher: 'The Russian Messenger',
//       summary:
//         'Um jovem estudante em São Petersburgo planeja e executa um assassinato, seguido por sua culpa e sofrimento.',
//       totalPages: 671,
//       author: {
//         id: 6,
//         name: 'Fiódor Dostoiévski',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 9,
//       title: 'O Sol é Para Todos',
//       publishedDate: new Date('1960-07-11'),
//       publisher: 'J.B. Lippincott & Co.',
//       summary:
//         'Uma jovem menina no sul dos Estados Unidos durante os anos 1930 observa os desafios da justiça racial em sua cidade.',
//       totalPages: 281,
//       author: {
//         id: 7,
//         name: 'Harper Lee',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//     {
//       id: 10,
//       title: 'A Metamorfose',
//       publishedDate: new Date('1915-10-17'),
//       publisher: 'Verlag Kurt Wolff',
//       summary:
//         'A história de Gregor Samsa, que acorda uma manhã transformado em um inseto gigante.',
//       totalPages: 201,
//       author: {
//         id: 8,
//         name: 'Franz Kafka',
//       },
//       poster_url:
//         'https://m.media-amazon.com/images/I/71V2v2GtAtL._AC_UF1000,1000_QL80_.jpg',
//     },
//   ]
// } // DEV

export function BookshelfPage() {
  const { signOut } = useAuth()

  const { data: userBooks } = useQuery<IBook[]>({
    queryKey: ['userBooks'],
    queryFn: getUserBooks,
  })
  const [searchResult, setSearchResult] = useState<IBook[]>([])

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearch = useDebounce(searchValue)

  useEffect(() => {
    if (!debouncedSearch) {
      setSearchResult([])
      return
    }

    getSearchBooks(debouncedSearch).then((data) => setSearchResult(data ?? []))
  }, [debouncedSearch])

  return (
    <div className="flex flex-col max-h-screen">
      <header className="flex gap-4 text-slate-50 items-center justify-between px-4 py-2">
        <Input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          variant="outlined"
          icon={<Search />}
          placeholder="Search for a book..."
          maxSize="none"
        />

        <button onClick={() => signOut()} type="button" title="LogOut">
          <LogOut className="size-7" />
        </button>
      </header>

      <div className="h-[.5px] bg-slate-800 mx-4 mt-2 mb-4" />

      {debouncedSearch ? (
        <div className="flex gap-2 px-4 text-slate-600">
          <Book className="size-5 inline" />
          <p className="text-sm">{searchResult?.length ?? '0'} books found</p>
        </div>
      ) : (
        <div className="flex gap-2 px-4 text-slate-600">
          <BookMarked className="size-5 inline" />
          <p className="text-sm">{userBooks?.length ?? '0'} books saved</p>
        </div>
      )}

      {debouncedSearch ? (
        <div className="space-y-4 px-4 my-4 overflow-y-scroll">
          {searchResult?.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              authorName={book.author.name}
              coverUrl={book.poster_url}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 px-4 my-4 overflow-y-scroll">
          {userBooks?.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              authorName={book.author.name}
              coverUrl={book.poster_url}
            />
          ))}
        </div>
      )}
    </div>
  )
}
