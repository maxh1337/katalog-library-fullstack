import { ICategory } from '@/types/category.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

const CATEGORIES = 'category'

export const CategoryService = {
	async getAll() {
		return axiosClassic<ICategory[]>({
			url: CATEGORIES,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET'
		})
	},

	async delete(id: number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		})
	},

	async create(name: string) {
		return instance<ICategory>({
			url: `${CATEGORIES}`,
			method: 'POST',
			data: { name: name }
		})
	}
}
