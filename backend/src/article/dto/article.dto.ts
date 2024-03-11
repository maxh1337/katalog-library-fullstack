import { Prisma } from '@prisma/client'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class ArticleDto implements Prisma.ArticleUpdateInput {
	@IsOptional()
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

	@IsArray()
	keywords: string[]

	@IsNumber()
	year: number

	@IsNumber()
	articleNumber: number

	@IsNumber()
	startPage: number
}
