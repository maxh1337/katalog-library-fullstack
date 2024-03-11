import { IArticle } from './article.interface'

export interface ICategory {
	id: number
	name: string
	articles: IArticle[]
}
