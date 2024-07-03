import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "./dto";
import {CreateAuthorDTO} from "../author/dto";
import {AuthorService} from "../author/author.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authorService: AuthorService,
        private readonly prisma: PrismaService
    ) {}

    async loginAuthor(loginDto: LoginDto) {
        const author = await this.validateAuthor(loginDto.username, loginDto.password)
        if (!author) {
            throw new UnauthorizedException("Invalid credentials")
        }
        const token = await this.generateToken(author)

        return {
            "token": token,
            "user": {
                "id": author.id,
                "username": author.username
            }
        }
    }

    async registerAuthor(registerDto: CreateAuthorDTO) {
        const author = await this.authorService.createAuthor(registerDto)
        const token = await this.generateToken(author)

        return {
            "token": token,
            "user": {
                "id": author.id,
                "username": author.username
            }
        }
    }

    async validateAuthor(username: string, password: string) {
        const author = await this.prisma.author.findUnique({ where: { username } })
        if (author && await bcrypt.compare(password, author.password)) {
            const { password, ...result } = author
            return result
        }
        return null
    }
    async generateToken(author) {
        const payload = {sub: author.id, username: author.username}
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}