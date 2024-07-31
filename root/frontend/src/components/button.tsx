import { ComponentProps, ReactNode } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-[100%] text-lg flex items-center justify-center gap-2 py-3 bg-violet-300 rounded-lg font-medium md:w-96"
    >
      {children}
    </button>
  )
}
