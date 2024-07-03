import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {ArticleService} from "./article.service";
import {Prisma} from "@prisma/client";
import {CreateArticleDTO, UpdateArticleDTO} from "./dto";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../../guards/jwt-quard";

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({type: CreateArticleDTO})
    @ApiOperation({summary: "Create a new article"})
    createNewArticle(
        @Body() createArticleDTO: CreateArticleDTO,
        @Req() request
    ) {
        const authorId = request.user.id

        return this.articleService.createArticle({...createArticleDTO, author: {connect: {id: authorId}}})
    }

    @Get(":id")
    @ApiOperation({summary: 'Get an article by id'})
    getArticleById(
        @Param("id", ParseIntPipe) id: number
    ) {
        return this.articleService.getArticleById(id)
    }

    @Get("name/:name")
    @ApiOperation({summary: 'Get an article by name'})
    getArticleByName(
        @Param("name") name: string
    ) {
        return this.articleService.getArticleByName(name)
    }

    @Get()
    @ApiOperation({ summary: 'Get all articles' })
    @ApiQuery({ name: 'authorId', required: false})
    getAllArticles(@Query('authorId') authorId?: string) {
        if (authorId) {
            return this.articleService.getAllArticlesByAuthorId(parseInt(authorId));
        } else {
            return this.articleService.getAllArticles();
        }
    }

    @Patch(":id")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({type: UpdateArticleDTO})
    @ApiOperation({summary: 'Update an article by id'})
    updateArticle(
        @Param("id", ParseIntPipe) articleId: number,
        @Body() updateArticleDTO: Prisma.ArticleUpdateInput,
        @Req() request
    ) {
        const authorId = request.user.id
        return this.articleService.updateArticle(articleId, updateArticleDTO, parseInt(authorId))
    }

    @Delete(":id")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Delete an article by id'})
    deleteArticle(
        @Param("id", ParseIntPipe) articleId: number,
        @Req() request
    ) {
        const authorId = request.user.id
        return this.articleService.deleteArticle(articleId, authorId)
    }


}
