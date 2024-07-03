import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ArticleModule} from "../article/article.module";
import {AuthorModule} from "../author/author.module";
import {AuthModule} from "../auth/auth.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        AuthorModule, ArticleModule, AuthModule,
        ConfigModule.forRoot({isGlobal: true})
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
