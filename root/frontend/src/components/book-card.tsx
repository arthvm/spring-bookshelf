import { Trash2 } from 'lucide-react'

interface BookCardProps {
  title: string
  authorName: string
  coverUrl: string
  handleDelete: () => void
}

export function BookCard({
  title,
  authorName,
  coverUrl,
  handleDelete,
}: BookCardProps) {
  return (
    <div className="flex gap-4">
      <img src={coverUrl} alt={title} />

      <div className="flex flex-col justify-center gap-4 py-5 w-full">
        <div className="flex flex-col">
          <h2 className="text-slate-50 text-lg">{title}</h2>
          <span className="text-slate-400 text-sm">{authorName}</span>
        </div>

        <div className="flex items-center justify-between w-full">
          {/* ADD REVIEW RATING */}
          {/* <span className="text-slate-300">{review}</span> */}
          <button
            onClick={() => handleDelete}
            type="button"
            title="Remove from bookshelf"
          >
            <Trash2 className="size-5 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
