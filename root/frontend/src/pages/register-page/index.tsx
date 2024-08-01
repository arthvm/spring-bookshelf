import { Link } from 'react-router-dom'
import { RegisterForm } from './register-form'

export function RegisterPage() {
  return (
    <>
      <RegisterForm />

      <footer>
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link className="text-slate-300 font-medium" to="/login">
            Log In
          </Link>
        </p>
      </footer>
    </>
  )
}
