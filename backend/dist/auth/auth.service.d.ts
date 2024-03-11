import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/journal/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwt;
    private userService;
    constructor(prisma: PrismaService, jwt: JwtService, userService: UserService);
    login(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            isAdmin: boolean;
        };
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            isAdmin: boolean;
        };
    }>;
    register(dto: AuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: number;
            email: string;
            isAdmin: boolean;
        };
    }>;
    private issueTokens;
    private returnUserFields;
    private validateUser;
}
