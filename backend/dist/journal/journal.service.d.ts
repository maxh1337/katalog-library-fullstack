import { PrismaService } from 'src/prisma.service';
import { CreateJournalDto } from './create-journal.dto';
import { SearchTermJournalAndNewsPaperDto } from './serchTerm.dto';
export declare class JournalService {
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
    create(dto: CreateJournalDto): Promise<{
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
