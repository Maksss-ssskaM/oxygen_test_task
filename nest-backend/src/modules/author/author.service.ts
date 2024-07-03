import {ConflictException, Injectable} from '@nestjs/common';
import {CreateAuthorDTO} from "./dto";
import {Author} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthorService {
    constructor(private readonly prisma: PrismaService) {}


    async createAuthor(data: CreateAuthorDTO): Promise<Author> {
        const existingUserByUsername = await this.getAuthorByUsername(data.username)
        if (existingUserByUsername) {
            throw new ConflictException(`Username ${data.username} is already taken`)
        }

        const existingUserByEmail = await this.getAuthorByEmail(data.email)
        if (existingUserByEmail) {
            throw new ConflictException(`Email ${data.email} is already registered`)
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return this.prisma.author.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        })
    }

    async getAuthorByUsername(username: string): Promise<Author> {
        return this.prisma.author.findUnique({where: {username}});
    }

    async getAuthorByEmail(email: string): Promise<Author> {
        return this.prisma.author.findUnique({where: {email}});
    }
}
