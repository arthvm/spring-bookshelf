import { useAuth } from '@/hooks/use-auth'
import { LogOut } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'

export function PrivateRoute() {
  const { username } = useAuth()
  const { isAuthenticated, signOut } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <header className="w-[100%] py-4 px-4 flex justify-between ">
        <span className="text-xl text-slate-50">Spring Bookshelf</span>
        <div className="flex gap-4 items-center">
          <span className="text-lg text-slate-50">@{username}</span>
          <button onClick={() => signOut()} title="LogOut">
            <LogOut className="size-7 text-slate-50" />
          </button>
        </div>
      </header>

      <div className="py-[1px] mx-5 bg-slate-800" />

      <Outlet />
    </>
  )
}
