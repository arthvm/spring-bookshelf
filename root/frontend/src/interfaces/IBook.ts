import { IAuthor } from './IAuthor'

export interface IBook {
  id: number | string
  title: string
  publishedDate: Date
  publisher: string
  summary: string
  totalPages: number
  author: IAuthor
  poster_url: string
}
