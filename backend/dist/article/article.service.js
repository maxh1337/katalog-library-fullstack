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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ArticleService = class ArticleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(dto) {
        const { searchTerm } = dto;
        const yearFrom = Number(dto.yearFrom);
        const yearTo = Number(dto.yearTo);
        const categoryId = Number(dto.categoryId);
        const prismaSearchTermFilter = {
            AND: [
                searchTerm
                    ? {
                        OR: [
                            {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive'
                                }
                            },
                            {
                                keywords: {
                                    has: searchTerm
                                }
                            },
                            {
                                author: {
                                    name: {
                                        contains: searchTerm,
                                        mode: 'insensitive'
                                    }
                                }
                            },
                            {
                                category: {
                                    name: {
                                        contains: searchTerm,
                                        mode: 'insensitive'
                                    }
                                }
                            }
                        ]
                    }
                    : {},
                categoryId
                    ? {
                        categoryId
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
        const articles = await this.prisma.article.findMany({
            where: prismaSearchTermFilter,
            select: {
                id: true,
                name: true,
                category: {
                    select: {
                        name: true
                    }
                },
                author: {
                    select: {
                        name: true
                    }
                },
                journal: {
                    select: {
                        name: true
                    }
                },
                newsPaper: {
                    select: {
                        name: true
                    }
                },
                keywords: true,
                year: true,
                articleNumber: true,
                startPage: true
            }
        });
        return articles;
    }
    async create(dto) {
        console.log(dto);
        const article = await this.prisma.article.create({
            data: {
                name: dto.name,
                category: {
                    connect: {
                        id: dto.categoryId
                    }
                },
                author: {
                    connect: {
                        id: dto.authorId
                    }
                },
                newsPaper: dto.newsPaperId
                    ? {
                        connect: {
                            id: dto.newsPaperId
                        }
                    }
                    : {},
                journal: dto.journalId
                    ? {
                        connect: {
                            id: dto.journalId
                        }
                    }
                    : {},
                year: dto.year,
                articleNumber: dto.articleNumber,
                startPage: dto.startPage
            }
        });
        return {
            name: article.name,
            id: article.id
        };
    }
    async update(id, dto) {
        const isExist = this.findById(id);
        if (!isExist)
            throw new common_1.NotFoundException('Article not found');
        await this.prisma.article.update({
            where: {
                id
            },
            data: {
                name: dto.name,
                category: {
                    connect: {
                        id: dto.categoryId
                    }
                },
                author: {
                    connect: {
                        id: dto.authorId
                    }
                },
                newsPaper: dto.newsPaperId
                    ? {
                        connect: {
                            id: dto.newsPaperId
                        }
                    }
                    : {},
                journal: dto.journalId
                    ? {
                        connect: {
                            id: dto.journalId
                        }
                    }
                    : {},
                keywords: dto.keywords,
                year: dto.year,
                articleNumber: dto.articleNumber,
                startPage: dto.startPage
            }
        });
        return this.findById(id);
    }
    async delete(id) {
        const isExist = this.findById(id);
        if (!isExist)
            throw new common_1.NotFoundException('Article not found');
        await this.prisma.article.delete({
            where: {
                id
            }
        });
        return {
            Delete: 'Success'
        };
    }
    async findById(id) {
        const article = await this.prisma.article.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                category: true,
                author: true,
                newsPaper: true,
                journal: true,
                keywords: true,
                year: true,
                articleNumber: true,
                startPage: true
            }
        });
        return article;
    }
    async findByCategoryId(id) {
        const article = await this.prisma.article.findMany({
            where: {
                categoryId: id
            },
            select: {
                id: true,
                name: true,
                category: true,
                author: true,
                newsPaper: true,
                journal: true,
                keywords: true,
                year: true,
                articleNumber: true,
                startPage: true
            }
        });
        return article;
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticleService);
//# sourceMappingURL=article.service.js.map