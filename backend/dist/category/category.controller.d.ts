import { CategoryService } from './category.service';
import { CreateCategoryDto } from './create-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    findCategoryById(id: string): Promise<{
        name: string;
        id: number;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        id: number;
        name: string;
    }>;
    delete(id: string): Promise<{
        id: number;
        name: string;
    }>;
}
