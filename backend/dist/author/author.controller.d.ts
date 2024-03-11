import { AuthorService } from './author.service';
import { AuthorDto, UpdateAuthorDto } from './create-author.dto';
export declare class AuthorController {
    private readonly authorService;
    constructor(authorService: AuthorService);
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
    create(dto: AuthorDto): Promise<{
        id: number;
        name: string;
    }>;
    delete(id: string): Promise<{
        id: number;
        name: string;
    }>;
    update(id: string, dto: UpdateAuthorDto): Promise<{
        id: number;
        name: string;
    }>;
}
