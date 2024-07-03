import {IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateAuthorDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({example: 'John Doe'})
    username: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: 'aboba@gmail.com'})
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example: 'randompassword'})
    password: string
}