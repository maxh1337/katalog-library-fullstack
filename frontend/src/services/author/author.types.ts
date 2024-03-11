import { IArticle } from '@/types/article.interface'

export type IAuthor = {
	id: number
	name: string
	articles: IArticle[]
}
