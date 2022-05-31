import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './article/article.module'
import { ReviewModule } from './review/review.module'
import { PrismaService } from './prisma/prisma.service'
import { asyncGraphqlConfig } from './configs/graphql.config'
import { configOptions } from './configs'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        GraphQLModule.forRootAsync(asyncGraphqlConfig),
        AuthModule,
        ArticleModule,
        ReviewModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
