import { useAuth } from '@/hooks/use-auth'
import { Navigate, Outlet } from 'react-router-dom'

export function PublicRoute() {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={'/bookshelf'} />
  }

  return (
    <section className="bg-pattern bg-no-repeat bg-center h-screen flex flex-col items-center justify-center gap-8 px-5">
      <div className="text-center space-y-1">
        <h1 className="text-3xl text-slate-50">Spring Bookshelf</h1>
        <p className="text-zinc-400">
          Add books to your library and review them!
        </p>
      </div>

      <Outlet />
    </section>
  )
}
