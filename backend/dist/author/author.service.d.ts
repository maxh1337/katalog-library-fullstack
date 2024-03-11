import { PrismaService } from 'src/prisma.service';
import { AuthorDto, UpdateAuthorDto } from './create-author.dto';
export declare class AuthorService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(): Promise<{
        name: string;
        id: number;
        articles: {
            id: number;
            name: string;
            categoryId: number;
            authorId: number;
            newsPaperId: number;
            journalId: number;
            keywords: string[];
            year: number;
            articleNumber: number;
            startPage: number;
        }[];
    }[]>;
    createAuthor(dto: AuthorDto): Promise<{
        id: number;
        name: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
    }>;
    update(id: number, dto: UpdateAuthorDto): Promise<{
        id: number;
        name: string;
    }>;
}
