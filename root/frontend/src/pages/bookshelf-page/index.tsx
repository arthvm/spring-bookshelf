import { BookCard } from '@/components/book-card'
import { useAuth } from '@/hooks/use-auth'
import { IBook } from '@/interfaces/IBook'
import { api } from '@/lib/axios'
import { Book, Frown, LogOut, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

export function BookshelfPage() {
  const { username, signOut } = useAuth()
  const [books, setBooks] = useState<IBook[]>([])

  async function getUserBooks() {
    try {
      const booksResponse = await api.get('/books/user/all')

      return booksResponse.data
    } catch (error) {
      console.log(error) // ADD ERROR TREATMENT
    }
  }

  async function deleteBookFromLibrary(bookId: number) {
    try {
      await api.delete(`/books/delete?book_id=${bookId}`)
    } catch (error) {
      console.log(error) // ADD ERROR TREATMENT
    }
  }

  useEffect(() => {
    getUserBooks().then((data) => setBooks(data))
  }, [])

  return (
    <>
      <div className="py-4 px-4 h-screen flex flex-col">
        <header className="w-full flex justify-between ">
          <span className="text-zinc-50 text-lg">@{username}</span>
          <div className="flex gap-4 items-center">
            <Search className="size-7 text-slate-50" />
            <button onClick={() => signOut()} title="LogOut">
              <LogOut className="size-7 text-slate-50" />
            </button>
          </div>
        </header>

        <div className="mt-5 mb-2 flex gap-2 text-slate-400 items-center">
          <Book className="size-5" />
          <p className="text-sm">
            {books.length
              ? `${books.length} books saved`
              : 'No books saved yet'}
          </p>
        </div>

        <div className="py-[1px] bg-slate-800" />

        {books.length ? (
          <div className="flex flex-col gap-8 px-4 py-6 overflow-y-auto">
            {books.map((book) => {
              return (
                <BookCard
                  key={book.id}
                  title={book.title}
                  authorName={book.author.name}
                  coverUrl={book.poster_url}
                  handleDelete={() => deleteBookFromLibrary(book.id)}
                />
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-5 text-slate-500 w-full h-full items-center justify-center text-center">
            <Frown className="size-20" />
            <p className="max-w-[70%]">
              Seems like you don&apos;t have any books saved yet...
            </p>
          </div>
        )}
      </div>
    </>
  )
}
