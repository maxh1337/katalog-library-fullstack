import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './create-category.dto';
export declare class CategoryService {
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
    create(dto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
    }>;
    findUnique(name: string): Promise<{
        id: number;
        name: string;
    }>;
    findCategoryById(id: number): Promise<{
        name: string;
        id: number;
    }>;
}
