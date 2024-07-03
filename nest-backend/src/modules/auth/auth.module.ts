import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {AuthController} from "./auth.controller";
import {AuthorModule} from "../author/author.module";
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        AuthorModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('SECRET'),
                signOptions: { expiresIn: parseInt(configService.get('EXPIRE_JWT'))},
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
