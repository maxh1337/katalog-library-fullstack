import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateJournalDto } from './create-journal.dto'
import { SearchTermJournalAndNewsPaperDto } from './serchTerm.dto'

@Injectable()
export class JournalService {
	constructor(private prisma: PrismaService) {}
	async getAll(dto: SearchTermJournalAndNewsPaperDto) {
		const { searchTerm } = dto

		const yearFrom = Number(dto.yearFrom)
		const yearTo = Number(dto.yearTo)

		const prismaSearchTermFilter: Prisma.JournalWhereInput = {
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
		return await this.prisma.journal.findMany({
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

	async create(dto: CreateJournalDto) {
		const isExists = await this.findUnique(dto.name, dto.number)

		if (isExists) throw new BadRequestException('Journal already exists')

		const journal = await this.prisma.journal.create({
			data: {
				name: dto.name,
				year: dto.year,
				number: dto.number
			}
		})

		return journal
	}

	async delete(id: number) {
		const journal = await this.prisma.journal.findUnique({
			where: {
				id: id
			}
		})

		if (!journal) throw new NotFoundException('Journal not found')

		return this.prisma.journal.delete({
			where: {
				id: id
			}
		})
	}

	async findUnique(name: string, number: number) {
		return await this.prisma.journal.findFirst({
			where: {
				name,
				number
			}
		})
	}
}
