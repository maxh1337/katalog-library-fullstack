export const ARTICLES = 'article'

export type TypeJournalDataFilters = {
	searchTerm?: string
	yearFrom?: string
	yearTo?: string
}

export type TypeJournalParamsFilters = {
	searchParams: TypeJournalDataFilters
}
