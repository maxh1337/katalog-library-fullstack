import { instance } from '@/api/api.interceptor'

import { IArticle } from '@/types/article.interface'
import {
	ARTICLES,
	TypeArticleDataFilters,
	TypeDeleteSuccess
} from './article.types'

const ARTICLE = 'article'

export const ArticleService = {
	//
	async getAll(queryData = {} as TypeArticleDataFilters) {
		return instance<IArticle[]>({
			url: ARTICLE,
			method: 'GET',
			params: queryData
		})
	},

	async getByCategoryId(id: number) {
		return instance<IArticle[]>({
			url: `${ARTICLE}/by-category/${id}`,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<IArticle>({
			url: `${ARTICLES}/${id}`,
			method: 'GET'
		})
	},

	async delete(id: number) {
		return instance<TypeDeleteSuccess>({
			url: `${ARTICLE}/${id}`,
			method: 'DELETE'
		})
	},

	async create(
		name: string,
		categoryId: number | undefined,
		authorId: number | undefined,
		journalId: number | undefined,
		newsPaperId: number | undefined,
		articleNumber: number | undefined,
		startPage: number | undefined,
		year: number | undefined
	) {
		return instance<IArticle>({
			url: `${ARTICLE}`,
			method: 'POST',
			data: {
				name: name,
				categoryId: categoryId,
				authorId: authorId,
				journalId: journalId,
				newsPaperId: newsPaperId,
				articleNumber: articleNumber,
				startPage: startPage,
				year: year
			}
		})
	}
}
