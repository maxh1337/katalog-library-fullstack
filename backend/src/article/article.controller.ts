import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ArticleService } from './article.service'
import { ArticleDto } from './dto/article.dto'
import { CreateArticleDto } from './dto/create-article.dto'
import { SearchTermDto } from './dto/searchTerm.dto'

@Controller('article')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAll(@Query() queryDto: SearchTermDto) {
		return this.articleService.getAll(queryDto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Post()
	async createArticle(@Body() dto: CreateArticleDto) {
		return this.articleService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	async updateArticle(@Param('id') id: string, @Body() dto: ArticleDto) {
		return this.articleService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth('admin')
	@Delete(':id')
	async deleteArticle(@Param('id') id: string) {
		return this.articleService.delete(+id)
	}

	@HttpCode(200)
	@Get('by-category/:id')
	@Auth()
	async findArticlesByCategoryId(@Param('id') id: string) {
		return this.articleService.findByCategoryId(+id)
	}
}
