import {Body, Controller, Post} from '@nestjs/common';
import {Author} from "@prisma/client";
import {CreateAuthorDTO} from "./dto";
import {AuthorService} from "./author.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    // @Post()
    // @ApiOperation({ summary: 'Create a new author' })
    // async createAuthor(@Body() createAuthorDto: CreateAuthorDTO): Promise<Author> {
    //     return this.authorService.createAuthor(createAuthorDto)
    // }
}
