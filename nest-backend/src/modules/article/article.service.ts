import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {Article, Prisma} from "@prisma/client";

@Injectable()
export class ArticleService {
    constructor(private prisma: PrismaService) {}

    async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
        const article = await this.findArticleByName(data.name)
        if (article) {
            throw new ConflictException(`Article name ${data.name} is already taken`)
        }

        return this.prisma.article.create({data: {
                name: data.name,
                content: data.content,
                author: data.author
            },
        })
    }

    async getAllArticles(): Promise<Article[]> {
        return this.prisma.article.findMany()
    }

    async getAllArticlesByAuthorId(authorId: number): Promise<Article[]> {
        return this.prisma.article.findMany({where: {authorId}})
    }

    async findArticleById(id: number): Promise<Article | null> {
        return this.prisma.article.findUnique({ where: {id} });
    }

    async getArticleById(id: number): Promise<Article> {
        const article = await this.findArticleById(id)

        if(!article) {
            throw new NotFoundException(`Article with id ${id} not found`)
        }

        return article
    }

    async findArticleByName(name: string): Promise<Article | null> {
        return this.prisma.article.findUnique({ where: { name } });
    }

    async getArticleByName(name: string): Promise<Article> {
        const article = await this.findArticleByName(name);
        if (!article) {
            throw new NotFoundException(`Article with name ${name} not found`);
        }
        return article;
    }

    async updateArticle(articleId: number, data: Prisma.ArticleUpdateInput, authorId: number): Promise<Article> {
        const article = await this.findArticleById(articleId)
        if (!article || article.authorId !== authorId) {
            throw new ConflictException(`Article ${data.name} doesn't belong to user with id ${authorId}`);
        }

        if (data.name) {
            const existingArticle = await this.findArticleByName(data.name as string);
            if (existingArticle && existingArticle.id !== articleId) {
                throw new ConflictException(`Article with name ${data.name} already exists.`);
            }
        }

        return this.prisma.article.update({
            where: { id: articleId },
            data,
        });
    }

    async deleteArticle(articleId, authorId: number): Promise<Article> {
        const article = await this.getArticleById(articleId)
        if (!article || article.authorId !== authorId) {
            throw new ConflictException(`This article doesn't belong to user with id ${authorId}`);
        }

        return this.prisma.article.delete({where: {id: articleId}})
    }
}
