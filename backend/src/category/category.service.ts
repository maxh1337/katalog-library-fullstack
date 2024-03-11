import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { CreateCategoryDto } from './create-category.dto'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return await this.prisma.category.findMany({
			select: {
				id: true,
				name: true,
				articles: true
			}
		})
	}

	async create(dto: CreateCategoryDto) {
		const isExists = await this.findUnique(dto.name)

		if (isExists) throw new BadRequestException('Category already exists')

		const category = await this.prisma.category.create({
			data: {
				name: dto.name
			}
		})

		return category
	}

	async delete(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id: id
			}
		})

		if (!category) throw new NotFoundException('Category not found')

		return this.prisma.category.delete({
			where: {
				id: id
			}
		})
	}

	async findUnique(name: string) {
		return await this.prisma.category.findUnique({
			where: {
				name
			}
		})
	}

	async findCategoryById(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				name: true
			}
		})

		if (!category) throw new NotFoundException('Category not found')

		return category
	}
}
