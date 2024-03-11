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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewspaperController = void 0;
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const serchTerm_dto_1 = require("../journal/serchTerm.dto");
const create_newspaper_dto_1 = require("./create-newspaper.dto");
const newspaper_service_1 = require("./newspaper.service");
let NewspaperController = class NewspaperController {
    constructor(newspaperService) {
        this.newspaperService = newspaperService;
    }
    async getAll(queryDto) {
        return this.newspaperService.getAll(queryDto);
    }
    async create(dto) {
        return this.newspaperService.create(dto);
    }
    async delete(id) {
        return this.newspaperService.delete(+id);
    }
};
exports.NewspaperController = NewspaperController;
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [serchTerm_dto_1.SearchTermJournalAndNewsPaperDto]),
    __metadata("design:returntype", Promise)
], NewspaperController.prototype, "getAll", null);
__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_newspaper_dto_1.CreateNewspaperDto]),
    __metadata("design:returntype", Promise)
], NewspaperController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Auth)('admin'),
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NewspaperController.prototype, "delete", null);
exports.NewspaperController = NewspaperController = __decorate([
    (0, common_1.Controller)('newspaper'),
    __metadata("design:paramtypes", [newspaper_service_1.NewspaperService])
], NewspaperController);
//# sourceMappingURL=newspaper.controller.js.map