export const ARTICLES = 'article'

export type TypeNewspaperDataFilters = {
	searchTerm?: string
	yearFrom?: string
	yearTo?: string
}

export type TypeNewspaperParamsFilters = {
	searchParams: TypeNewspaperDataFilters
}
