import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'

export function RegisterPage() {
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
            icon={<User className="size-5 text-slate-400" />}
            placeholder="Username"
            type="text"
          />

          <Input
            icon={<Mail className="size-5 text-slate-400" />}
            placeholder="Email"
            type="email"
          />

          <Input
            icon={<Lock className="size-5 text-slate-400" />}
            placeholder="Password"
            type="password"
          />
        </div>

        <Button>
          Sign Up
          <ArrowRight className="size-5" />
        </Button>
      </form>

      <footer>
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <a className="text-slate-300 font-medium" href="/login">
            Log In
          </a>
        </p>
      </footer>
    </section>
  )
}
