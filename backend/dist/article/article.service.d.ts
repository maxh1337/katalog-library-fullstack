import { PrismaService } from 'src/prisma.service';
import { ArticleDto } from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchTermDto } from './dto/searchTerm.dto';
export declare class ArticleService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(dto: SearchTermDto): Promise<{
        category: {
            name: string;
        };
        newsPaper: {
            name: string;
        };
        journal: {
            name: string;
        };
        author: {
            name: string;
        };
        name: string;
        keywords: string[];
        year: number;
        articleNumber: number;
        startPage: number;
        id: number;
    }[]>;
    create(dto: CreateArticleDto): Promise<{
        name: string;
        id: number;
    }>;
    update(id: number, dto: ArticleDto): Promise<{
        category: {
            id: number;
            name: string;
        };
        newsPaper: {
            id: number;
            year: number;
            name: string;
            number: number;
        };
        journal: {
            id: number;
            year: number;
            name: string;
            number: number;
        };
        author: {
            id: number;
            name: string;
        };
        name: string;
        keywords: string[];
        year: number;
        articleNumber: number;
        startPage: number;
        id: number;
    }>;
    delete(id: number): Promise<{
        Delete: string;
    }>;
    findById(id: number): Promise<{
        category: {
            id: number;
            name: string;
        };
        newsPaper: {
            id: number;
            year: number;
            name: string;
            number: number;
        };
        journal: {
            id: number;
            year: number;
            name: string;
            number: number;
        };
        author: {
            id: number;
            name: string;
        };
        name: string;
        keywords: string[];
        year: number;
        articleNumber: number;
        startPage: number;
        id: number;
    }>;
    findByCategoryId(id: number): Promise<{
        category: {
            id: number;
            name: string;
        };
        newsPaper: {
            id: number;
            year: number;
            name: string;
            number: number;
        };
        journal: {
            id: number;
            year: number;
            name: string;
            number: number;
        };
        author: {
            id: number;
            name: string;
        };
        name: string;
        keywords: string[];
        year: number;
        articleNumber: number;
        startPage: number;
        id: number;
    }[]>;
}
