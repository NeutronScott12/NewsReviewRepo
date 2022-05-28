import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { GqlAuthGuard } from '@thelasthurrah/the-last-hurrah-shared'

import { ArticleService } from './services/article.service'
import { ArticleResolver } from './resolvers/article.resolver'
import { PrismaService } from '../prisma/prisma.service'

@Module({
    providers: [
        // { provide: APP_GUARD, useClass: GqlAuthGuard },
        ArticleResolver,
        ArticleService,
        PrismaService,
    ],
})
export class ArticleModule {}
