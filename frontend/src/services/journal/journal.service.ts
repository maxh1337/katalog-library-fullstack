import { instance } from '@/api/api.interceptor'

import { IJournal } from '@/types/journal.interface'
import { TypeJournalDataFilters } from './journal.types'

const JOURNAL = 'journal'

export const JournalService = {
	//
	async getAll(queryData = {} as TypeJournalDataFilters) {
		return instance<IJournal[]>({
			url: JOURNAL,
			method: 'GET',
			params: queryData
		})
	},

	async delete(id: number) {
		return instance<IJournal>({
			url: `${JOURNAL}/${id}`,
			method: 'DELETE'
		})
	},

	async create(
		name: string,
		year: number | undefined,
		number: number | undefined
	) {
		return instance<IJournal>({
			url: `${JOURNAL}`,
			method: 'POST',
			data: { name: name, year: year, number: number }
		})
	}
}
