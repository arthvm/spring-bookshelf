import { Link } from 'react-router-dom'
import { LoginForm } from './login-form'

export function LogInPage() {
  return (
    <>
      <LoginForm />

      <footer>
        <p className="text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link className="text-slate-300 font-medium" to="/register">
            Sign Up
          </Link>
        </p>
      </footer>
    </>
  )
}
