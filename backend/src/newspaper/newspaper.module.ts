import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { NewspaperController } from './newspaper.controller'
import { NewspaperService } from './newspaper.service'

@Module({
	controllers: [NewspaperController],
	providers: [NewspaperService, PrismaService]
})
export class NewspaperModule {}
