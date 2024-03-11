import { IArticle } from './article.interface'

export interface IJournal {
	id: number
	name: string
	year: number
	number: number
	articles: IArticle[]
}
