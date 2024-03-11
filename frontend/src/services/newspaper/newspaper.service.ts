import { instance } from '@/api/api.interceptor'

import { IJournal } from '@/types/journal.interface'
import { TypeNewspaperDataFilters } from './newspaper.types'

const NEWSPAPER = 'newspaper'

export const NewsPaperService = {
	//
	async getAll(queryData = {} as TypeNewspaperDataFilters) {
		return instance<IJournal[]>({
			url: NEWSPAPER,
			method: 'GET',
			params: queryData
		})
	},
	async delete(id: number) {
		return instance<IJournal>({
			url: `${NEWSPAPER}/${id}`,
			method: 'DELETE'
		})
	},

	async create(
		name: string,
		year: number | undefined,
		number: number | undefined
	) {
		return instance<IJournal>({
			url: `${NEWSPAPER}`,
			method: 'POST',
			data: { name: name, year: year, number: number }
		})
	}
}
