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
import { CreateJournalDto } from './create-journal.dto'
import { JournalService } from './journal.service'
import { SearchTermJournalAndNewsPaperDto } from './serchTerm.dto'

@Controller('journal')
export class JournalController {
	constructor(private readonly journalService: JournalService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth()
	async getAll(@Query() queryDto: SearchTermJournalAndNewsPaperDto) {
		return this.journalService.getAll(queryDto)
	}

	@Auth('admin')
	@Post()
	@HttpCode(200)
	async create(@Body() dto: CreateJournalDto) {
		return this.journalService.create(dto)
	}

	@Auth('admin')
	@Delete(':id')
	@HttpCode(200)
	async delete(@Param('id') id: string) {
		return this.journalService.delete(+id)
	}
}
