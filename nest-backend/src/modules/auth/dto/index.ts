import {IsNotEmpty, IsString, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({example: 'John Doe'})
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example: 'randompassword'})
    password: string
}

export class RegisterAuthorDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @ApiProperty({example: 'John Doe'})
    username: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({example: 'randompassword'})
    password: string
}