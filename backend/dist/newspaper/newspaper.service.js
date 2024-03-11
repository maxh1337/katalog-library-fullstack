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
exports.NewspaperService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let NewspaperService = class NewspaperService {
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
        return await this.prisma.newsPaper.findMany({
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
            throw new common_1.BadRequestException('Newspaper already exists');
        const newspaper = await this.prisma.newsPaper.create({
            data: {
                name: dto.name,
                year: dto.year,
                number: dto.number
            }
        });
        return newspaper;
    }
    async delete(id) {
        const newspaper = await this.prisma.newsPaper.findUnique({
            where: {
                id: id
            }
        });
        if (!newspaper)
            throw new common_1.NotFoundException('Newspaper not found');
        return this.prisma.newsPaper.delete({
            where: {
                id: id
            }
        });
    }
    async findUnique(name, number) {
        const article = await this.prisma.newsPaper.findFirst({
            where: {
                name,
                number
            }
        });
        return article;
    }
};
exports.NewspaperService = NewspaperService;
exports.NewspaperService = NewspaperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewspaperService);
//# sourceMappingURL=newspaper.service.js.map