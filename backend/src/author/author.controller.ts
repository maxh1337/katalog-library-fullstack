import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { AuthorService } from './author.service'
import { AuthorDto, UpdateAuthorDto } from './create-author.dto'

@Controller('author')
export class AuthorController {
	constructor(private readonly authorService: AuthorService) {}

	@Auth()
	@Get()
	async getAll() {
		return this.authorService.getAll()
	}

	@Auth('admin')
	@Post()
	async create(@Body() dto: AuthorDto) {
		return this.authorService.createAuthor(dto)
	}

	@Auth('admin')
	@Delete('/:id')
	async delete(@Param('id') id: string) {
		return this.authorService.delete(+id)
	}

	@Auth('admin')
	@Put('/:id')
	async update(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
		return this.authorService.update(+id, dto)
	}
}
