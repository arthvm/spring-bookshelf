import { Bookmark } from 'lucide-react'

interface BookCardProps {
  title: string
  authorName: string
  coverUrl: string
}

export function BookCard({ title, authorName, coverUrl }: BookCardProps) {
  return (
    <div className="flex w-full bg-slate-900 rounded-md overflow-hidden gap-4 items-center relative">
      <img className="max-h-36" src={coverUrl} alt={title} />

      <div className="flex flex-col">
        <h2 className="text-slate-100 font-semibold">{title}</h2>
        <span className="text-slate-500 text-sm">{authorName}</span>
      </div>

      <Bookmark className="size-5 absolute right-4 top-4 text-slate-200 fill-slate-200" />
    </div>
  )
}
