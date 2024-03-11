import { SearchTermJournalAndNewsPaperDto } from 'src/journal/serchTerm.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateNewspaperDto } from './create-newspaper.dto';
export declare class NewspaperService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(dto: SearchTermJournalAndNewsPaperDto): Promise<{
        number: number;
        name: string;
        year: number;
        id: number;
        articles: {
            name: string;
        }[];
    }[]>;
    create(dto: CreateNewspaperDto): Promise<{
        id: number;
        year: number;
        name: string;
        number: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        year: number;
        name: string;
        number: number;
    }>;
    findUnique(name: string, number: number): Promise<{
        id: number;
        year: number;
        name: string;
        number: number;
    }>;
}
