import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto";
import {CreateAuthorDTO} from "../author/dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.loginAuthor(loginDto)
    }

    @Post('register')
    async register(@Body() registerDto: CreateAuthorDTO) {
        return this.authService.registerAuthor(registerDto)
    }
}
