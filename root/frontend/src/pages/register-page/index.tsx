import { RegisterForm } from './register-form'

export function RegisterPage() {
  return (
    <section className="bg-pattern bg-no-repeat bg-center h-screen flex flex-col items-center justify-center gap-8 px-5">
      <div className="text-center space-y-1">
        <h1 className="text-3xl text-slate-50">Spring Bookshelf</h1>
        <p className="text-zinc-400">
          Add books to your library and review them!
        </p>
      </div>

      <RegisterForm />

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
