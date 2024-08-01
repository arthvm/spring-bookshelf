import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { ArrowRight, Lock, Mail, User } from 'lucide-react'

export function RegisterForm() {
  return (
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
  )
}
