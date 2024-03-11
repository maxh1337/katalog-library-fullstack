import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { AuthModule } from './auth/auth.module'
import { AuthorModule } from './author/author.module'
import { CategoryModule } from './category/category.module'
import { JournalModule } from './journal/journal.module'
import { UserModule } from './journal/user/user.module'
import { NewspaperModule } from './newspaper/newspaper.module'
import { PrismaService } from './prisma.service'

@Module({
	imports: [
		ConfigModule.forRoot(),
		CategoryModule,
		NewspaperModule,
		ArticleModule,
		JournalModule,
		AuthorModule,
		AuthModule,
		UserModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
