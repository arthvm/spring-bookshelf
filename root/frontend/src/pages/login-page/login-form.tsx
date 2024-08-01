import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ArrowRight, Lock, LogIn } from 'lucide-react'

export function LoginForm() {
  return (
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
  )
}
