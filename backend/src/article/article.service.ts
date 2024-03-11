import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { ArticleDto } from './dto/article.dto'
import { CreateArticleDto } from './dto/create-article.dto'
import { SearchTermDto } from './dto/searchTerm.dto'

@Injectable()
export class ArticleService {
	constructor(private prisma: PrismaService) {}

	async getAll(dto: SearchTermDto) {
		const { searchTerm } = dto

		const yearFrom = Number(dto.yearFrom)
		const yearTo = Number(dto.yearTo)

		const categoryId = Number(dto.categoryId)

		const prismaSearchTermFilter: Prisma.ArticleWhereInput = {
			AND: [
				searchTerm
					? {
							OR: [
								{
									name: {
										contains: searchTerm,
										mode: 'insensitive'
									}
								},
								{
									keywords: {
										has: searchTerm
									}
								},
								{
									author: {
										name: {
											contains: searchTerm,
											mode: 'insensitive'
										}
									}
								},
								{
									category: {
										name: {
											contains: searchTerm,
											mode: 'insensitive'
										}
									}
								}
							]
					  }
					: {},

				categoryId
					? {
							categoryId
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

		const articles = await this.prisma.article.findMany({
			where: prismaSearchTermFilter,
			select: {
				id: true,
				name: true,
				category: {
					select: {
						name: true
					}
				},
				author: {
					select: {
						name: true
					}
				},
				journal: {
					select: {
						name: true
					}
				},
				newsPaper: {
					select: {
						name: true
					}
				},
				keywords: true,
				year: true,
				articleNumber: true,
				startPage: true
			}
		})

		return articles
	}

	async create(dto: CreateArticleDto) {
		console.log(dto)

		const article = await this.prisma.article.create({
			data: {
				name: dto.name,
				category: {
					connect: {
						id: dto.categoryId
					}
				},
				author: {
					connect: {
						id: dto.authorId
					}
				},
				newsPaper: dto.newsPaperId
					? {
							connect: {
								id: dto.newsPaperId
							}
					  }
					: {},
				journal: dto.journalId
					? {
							connect: {
								id: dto.journalId
							}
					  }
					: {},
				year: dto.year,
				articleNumber: dto.articleNumber,
				startPage: dto.startPage
			}
		})

		return {
			name: article.name,
			id: article.id
		}
	}

	async update(id: number, dto: ArticleDto) {
		const isExist = this.findById(id)
		if (!isExist) throw new NotFoundException('Article not found')

		await this.prisma.article.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				category: {
					connect: {
						id: dto.categoryId
					}
				},
				author: {
					connect: {
						id: dto.authorId
					}
				},
				newsPaper: dto.newsPaperId
					? {
							connect: {
								id: dto.newsPaperId
							}
					  }
					: {},
				journal: dto.journalId
					? {
							connect: {
								id: dto.journalId
							}
					  }
					: {},
				keywords: dto.keywords,
				year: dto.year,
				articleNumber: dto.articleNumber,
				startPage: dto.startPage
			}
		})

		return this.findById(id)
	}

	async delete(id: number) {
		const isExist = this.findById(id)
		if (!isExist) throw new NotFoundException('Article not found')

		await this.prisma.article.delete({
			where: {
				id
			}
		})

		return {
			Delete: 'Success'
		}
	}

	async findById(id: number) {
		const article = await this.prisma.article.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true,
				category: true,
				author: true,
				newsPaper: true,
				journal: true,
				keywords: true,
				year: true,
				articleNumber: true,
				startPage: true
			}
		})

		return article
	}

	async findByCategoryId(id: number) {
		const article = await this.prisma.article.findMany({
			where: {
				categoryId: id
			},
			select: {
				id: true,
				name: true,
				category: true,
				author: true,
				newsPaper: true,
				journal: true,
				keywords: true,
				year: true,
				articleNumber: true,
				startPage: true
			}
		})

		return article
	}
}
