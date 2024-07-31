import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ArrowRight, Lock, LogIn } from 'lucide-react'

export function LogInPage() {
  return (
    <section className="bg-pattern bg-no-repeat bg-center h-screen flex flex-col items-center justify-center gap-8 px-5">
      <div className="text-center space-y-1">
        <h1 className="text-3xl text-slate-50">Spring Bookshelf</h1>
        <p className="text-zinc-400">
          Add books to your library and review them!
        </p>
      </div>

      <form className="w-[100%] bg-slate-800 shadow-shape rounded-xl p-4 space-y-3 md:w-fit">
        <div className="space-y-2">
          <Input
            icon={<LogIn className="size-5 text-slate-400" />}
            placeholder="Username or Email"
            type="text"
          />

          <Input
            icon={<Lock className="size-5 text-slate-400" />}
            placeholder="Password"
            type="password"
          />
        </div>

        <Button>
          Log In
          <ArrowRight className="size-5" />
        </Button>
      </form>

      <footer>
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <a className="text-slate-300 font-medium" href="/login">
            Sign Up
          </a>
        </p>
      </footer>
    </section>
  )
}
