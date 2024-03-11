import { IsOptional, IsString } from 'class-validator'

export class SearchTermDto {
	@IsString()
	@IsOptional()
	searchTerm?: string

	@IsString()
	@IsOptional()
	categoryId?: string

	@IsString()
	@IsOptional()
	yearFrom?: string

	@IsString()
	@IsOptional()
	yearTo?: string
}
