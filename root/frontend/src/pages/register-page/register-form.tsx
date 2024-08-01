import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useAuth } from '@/hooks/use-auth'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'
import { FormEvent } from 'react'

export function RegisterForm() {
  const { signUp } = useAuth()

  async function registerUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const username = String(data.get('username'))
    const email = String(data.get('email'))
    const password = String(data.get('password'))

    if (!username || !email || !password) return

    try {
      await signUp({ username, email, password })
    } catch (error) {
      console.log(error) // ADD ERROR TREATMENT LATER
    }
  }

  return (
    <form
      onSubmit={registerUser}
      className="w-[100%] bg-slate-800 shadow-shape rounded-xl p-4 space-y-3 md:w-fit"
    >
      <div className="space-y-2">
        <Input
          icon={<User className="size-5 text-slate-400" />}
          placeholder="Username"
          type="text"
          name="username"
          required
        />

        <Input
          icon={<Mail className="size-5 text-slate-400" />}
          placeholder="Email"
          type="email"
          name="email"
          required
        />

        <Input
          icon={<Lock className="size-5 text-slate-400" />}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
      </div>

      <Button>
        Sign Up
        <ArrowRight className="size-5" />
      </Button>
    </form>
  )
}
