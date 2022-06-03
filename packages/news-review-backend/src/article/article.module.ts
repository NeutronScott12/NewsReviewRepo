import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { ArticleService } from './services/article.service'
import { ArticleResolver } from './resolvers/article.resolver'
import { PrismaService } from '../prisma/prisma.service'
import { GqlAuthGuard } from 'src/auth/guards'

@Module({
    providers: [
        { provide: APP_GUARD, useClass: GqlAuthGuard },
        ArticleResolver,
        ArticleService,
        PrismaService,
    ],
})
export class ArticleModule {}
