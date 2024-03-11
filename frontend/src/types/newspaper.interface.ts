import { IArticle } from './article.interface'

export interface INewspaper {
	id: number
	name: string
	year: number
	number: number
	articles: IArticle[]
}
