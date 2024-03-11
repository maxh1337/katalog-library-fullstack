import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthorDto, UpdateAuthorDto } from './create-author.dto'

@Injectable()
export class AuthorService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.author.findMany({
			select: {
				id: true,
				name: true,
				articles: true
			}
		})
	}

	async createAuthor(dto: AuthorDto) {
		const isExists = await this.prisma.author.findUnique({
			where: {
				name: dto.name
			}
		})

		if (isExists) throw new BadRequestException('Author already exists')

		const author = await this.prisma.author.create({
			data: {
				name: dto.name
			}
		})

		return author
	}

	async delete(id: number) {
		const author = await this.prisma.author.findUnique({
			where: {
				id
			}
		})

		if (!author) throw new NotFoundException('Author not found')

		return this.prisma.author.delete({
			where: {
				id: id
			}
		})
	}

	async update(id: number, dto: UpdateAuthorDto) {
		console.log(dto.name)
		const author = await this.prisma.author.findUnique({
			where: {
				id
			}
		})

		if (!author) throw new NotFoundException('Author not found')

		return this.prisma.author.update({
			where: {
				id
			},
			data: {
				name: dto.name
			}
		})
	}
}
