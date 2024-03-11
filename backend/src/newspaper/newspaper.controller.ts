import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { SearchTermJournalAndNewsPaperDto } from 'src/journal/serchTerm.dto'
import { CreateNewspaperDto } from './create-newspaper.dto'
import { NewspaperService } from './newspaper.service'

@Controller('newspaper')
export class NewspaperController {
	constructor(private readonly newspaperService: NewspaperService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAll(@Query() queryDto: SearchTermJournalAndNewsPaperDto) {
		return this.newspaperService.getAll(queryDto)
	}

	@Auth('admin')
	@Post()
	@HttpCode(200)
	async create(@Body() dto: CreateNewspaperDto) {
		return this.newspaperService.create(dto)
	}

	@Auth('admin')
	@Delete('/:id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.newspaperService.delete(+id)
	}
}
