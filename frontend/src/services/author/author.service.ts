import instance from '@/api/api.interceptor'
import { IAuthor } from './author.types'

const AUTHOR = 'author'

export const AuthorService = {
	//
	async getAll() {
		return instance<IAuthor[]>({
			url: AUTHOR,
			method: 'GET'
		})
	},

	async delete(id: number) {
		return instance<IAuthor>({
			url: `${AUTHOR}/${id}`,
			method: 'DELETE'
		})
	},

	async create(name: string) {
		return instance<IAuthor>({
			url: `${AUTHOR}`,
			method: 'POST',
			data: { name: name }
		})
	},

	async update(id: number, name: string) {
		return instance<IAuthor>({
			url: `${AUTHOR}/${id}`,
			method: 'PUT',
			data: { name: name }
		})
	}
}
