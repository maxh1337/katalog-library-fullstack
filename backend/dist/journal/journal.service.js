"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let JournalService = class JournalService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(dto) {
        const { searchTerm } = dto;
        const yearFrom = Number(dto.yearFrom);
        const yearTo = Number(dto.yearTo);
        const prismaSearchTermFilter = {
            AND: [
                searchTerm
                    ? {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }
                    : {},
                yearFrom && yearTo
                    ? {
                        year: {
                            gte: yearFrom
                        },
                        NOT: {
                            year: {
                                gt: yearTo
                            }
                        }
                    }
                    : {}
            ]
        };
        return await this.prisma.journal.findMany({
            where: prismaSearchTermFilter,
            select: {
                id: true,
                name: true,
                year: true,
                number: true,
                articles: {
                    select: {
                        name: true
                    }
                }
            }
        });
    }
    async create(dto) {
        const isExists = await this.findUnique(dto.name, dto.number);
        if (isExists)
            throw new common_1.BadRequestException('Journal already exists');
        const journal = await this.prisma.journal.create({
            data: {
                name: dto.name,
                year: dto.year,
                number: dto.number
            }
        });
        return journal;
    }
    async delete(id) {
        const journal = await this.prisma.journal.findUnique({
            where: {
                id: id
            }
        });
        if (!journal)
            throw new common_1.NotFoundException('Journal not found');
        return this.prisma.journal.delete({
            where: {
                id: id
            }
        });
    }
    async findUnique(name, number) {
        return await this.prisma.journal.findFirst({
            where: {
                name,
                number
            }
        });
    }
};
exports.JournalService = JournalService;
exports.JournalService = JournalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JournalService);
//# sourceMappingURL=journal.service.js.map