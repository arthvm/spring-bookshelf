import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { api } from '@/lib/axios'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { FormEvent } from 'react'

export function LoginForm() {
  async function loginUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = String(data.get('email'))
    const password = String(data.get('password'))

    if (!email || !password) return

    try {
      const loginResponse = await api.post('/login', {
        login: email,
        password,
      })

      console.log(loginResponse.data.token) // SAVE TOKEN IN THE FUTURE
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={loginUser}
      className="w-[100%] bg-slate-800 shadow-shape rounded-xl p-4 space-y-3 md:w-fit"
    >
      <div className="space-y-2">
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
        Log In
        <ArrowRight className="size-5" />
      </Button>
    </form>
  )
}
