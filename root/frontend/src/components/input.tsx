import { ComponentProps, ReactNode, useRef } from 'react'

interface InputProp extends ComponentProps<'input'> {
  icon?: ReactNode
}

export function Input({ icon, ...props }: InputProp) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      inputRef.current?.focus()
    }
  }

  return (
    <div className="py-2 text-lg text-slate-50 flex items-center justify-start gap-2 md:w-96">
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        aria-label="Focus on input"
      >
        {icon}
      </div>
      <input
        ref={inputRef}
        className="w-[100%] bg-transparent outline-none"
        {...props}
      />
    </div>
  )
}
