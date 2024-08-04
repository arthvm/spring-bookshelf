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
  try {
    const booksResponse = await api.get(`/books/${bookTitle}`)

    return booksResponse.data
  } catch (err) {
    console.log(err)
  }
}
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
              authorName={book.author}
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
              authorName={book.author}
              coverUrl={book.poster_url}
            />
          ))}
        </div>
      )}
    </div>
  )
}
