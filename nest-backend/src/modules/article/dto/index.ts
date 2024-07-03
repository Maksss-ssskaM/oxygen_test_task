import {ApiProperty, PartialType} from "@nestjs/swagger";
import {Prisma} from "@prisma/client";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateArticleDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "Dumplings"})
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: "A story about how to cook dumplings correctly"})
    content: string
}

export class UpdateArticleDTO extends PartialType(CreateArticleDTO) {
}