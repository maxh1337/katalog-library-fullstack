import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchTermDto } from './dto/searchTerm.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getAll(queryDto: SearchTermDto): Promise<{
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
    createArticle(dto: CreateArticleDto): Promise<{
        name: string;
        id: number;
    }>;
    updateArticle(id: string, dto: ArticleDto): Promise<{
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
    deleteArticle(id: string): Promise<{
        Delete: string;
    }>;
    findArticlesByCategoryId(id: string): Promise<{
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
