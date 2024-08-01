import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useAuth } from '@/hooks/use-auth'
import { ArrowRight, Lock, Mail } from 'lucide-react'
import { FormEvent } from 'react'

export function LoginForm() {
  const { signIn } = useAuth()

  async function loginUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = String(data.get('email'))
    const password = String(data.get('password'))

    if (!email || !password) return

    try {
      await signIn({ email, password })
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
          placeholder="Username or Email"
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
