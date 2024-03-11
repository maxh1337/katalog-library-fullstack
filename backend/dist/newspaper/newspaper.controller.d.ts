import { SearchTermJournalAndNewsPaperDto } from 'src/journal/serchTerm.dto';
import { CreateNewspaperDto } from './create-newspaper.dto';
import { NewspaperService } from './newspaper.service';
export declare class NewspaperController {
    private readonly newspaperService;
    constructor(newspaperService: NewspaperService);
    getAll(queryDto: SearchTermJournalAndNewsPaperDto): Promise<{
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
    delete(id: string): Promise<{
        id: number;
        year: number;
        name: string;
        number: number;
    }>;
}
