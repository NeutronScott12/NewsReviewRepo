import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ArticleModule } from './modules/article/article.module'
import { ReviewModule } from './modules/review/review.module'
import { PrismaService } from './prisma/prisma.service'
import { asyncGraphqlConfig } from './configs/graphql.config'
import { configOptions } from './configs'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CaslModule } from './casl/casl.module'

@Module({
    imports: [
        ConfigModule.forRoot(configOptions),
        GraphQLModule.forRootAsync(asyncGraphqlConfig),

        AuthModule,
        ArticleModule,
        ReviewModule,
        UserModule,
        CaslModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
