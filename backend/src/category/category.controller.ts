import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './create-category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@HttpCode(200)
	@Get(':id')
	async findCategoryById(@Param('id') id: string) {
		return this.categoryService.findCategoryById(+id)
	}

	@Auth('admin')
	@Post()
	@HttpCode(200)
	async create(@Body() dto: CreateCategoryDto) {
		return this.categoryService.create(dto)
	}

	@Auth('admin')
	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.categoryService.delete(+id)
	}
}
