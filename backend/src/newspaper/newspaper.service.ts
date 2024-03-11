import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { SearchTermJournalAndNewsPaperDto } from 'src/journal/serchTerm.dto'
import { PrismaService } from 'src/prisma.service'
import { CreateNewspaperDto } from './create-newspaper.dto'

@Injectable()
export class NewspaperService {
	constructor(private prisma: PrismaService) {}
	async getAll(dto: SearchTermJournalAndNewsPaperDto) {
		const { searchTerm } = dto

		const yearFrom = Number(dto.yearFrom)
		const yearTo = Number(dto.yearTo)

		const prismaSearchTermFilter: Prisma.NewsPaperWhereInput = {
			AND: [
				searchTerm
					? {
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							}
					  }
					: {},
				yearFrom && yearTo
					? {
							year: {
								gte: yearFrom
							},
							NOT: {
								year: {
									gt: yearTo
								}
							}
					  }
					: {}
			]
		}
		return await this.prisma.newsPaper.findMany({
			where: prismaSearchTermFilter,
			select: {
				id: true,
				name: true,
				year: true,
				number: true,
				articles: {
					select: {
						name: true
					}
				}
			}
		})
	}

	async create(dto: CreateNewspaperDto) {
		const isExists = await this.findUnique(dto.name, dto.number)

		if (isExists) throw new BadRequestException('Newspaper already exists')

		const newspaper = await this.prisma.newsPaper.create({
			data: {
				name: dto.name,
				year: dto.year,
				number: dto.number
			}
		})

		return newspaper
	}

	async delete(id: number) {
		const newspaper = await this.prisma.newsPaper.findUnique({
			where: {
				id: id
			}
		})

		if (!newspaper) throw new NotFoundException('Newspaper not found')

		return this.prisma.newsPaper.delete({
			where: {
				id: id
			}
		})
	}

	async findUnique(name: string, number: number) {
		const article = await this.prisma.newsPaper.findFirst({
			where: {
				name,
				number
			}
		})
		return article
	}
}
