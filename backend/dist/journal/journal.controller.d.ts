import { CreateJournalDto } from './create-journal.dto';
import { JournalService } from './journal.service';
import { SearchTermJournalAndNewsPaperDto } from './serchTerm.dto';
export declare class JournalController {
    private readonly journalService;
    constructor(journalService: JournalService);
    getAll(queryDto: SearchTermJournalAndNewsPaperDto): Promise<{
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
    delete(id: string): Promise<{
        id: number;
        year: number;
        name: string;
        number: number;
    }>;
}
