import { IsOptional, IsString } from 'class-validator'

export class SearchTermJournalAndNewsPaperDto {
	@IsString()
	@IsOptional()
	searchTerm?: string

	@IsString()
	@IsOptional()
	yearFrom?: string

	@IsString()
	@IsOptional()
	yearTo?: string
}
