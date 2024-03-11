import { Prisma } from '@prisma/client';
export declare class ArticleDto implements Prisma.ArticleUpdateInput {
    name: string;
    categoryId: number;
    authorId: number;
    newsPaperId: number;
    journalId: number;
    keywords: string[];
    year: number;
    articleNumber: number;
    startPage: number;
}
