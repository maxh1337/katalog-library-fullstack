import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateArticleDto {
	@IsString()
	name: string

	@IsNumber()
	categoryId: number

	@IsNumber()
	authorId: number

	@IsOptional()
	@IsNumber()
	newsPaperId: number

	@IsOptional()
	@IsNumber()
	journalId: number

	@IsNumber()
	year: number

	@IsNumber()
	articleNumber: number

	@IsNumber()
	startPage: number
}
