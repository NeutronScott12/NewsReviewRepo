import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { ArticleService } from './services/article.service'
import { ArticleResolver } from './resolvers/article.resolver'
import { PrismaService } from '../prisma/prisma.service'
import { GqlAuthGuard } from '../auth/guards'
import { CaslModule } from '../casl/casl.module'
import { UserService } from '../user/services/user.service'

@Module({
    providers: [
        { provide: APP_GUARD, useClass: GqlAuthGuard },
        ArticleResolver,
        ArticleService,
        UserService,
        PrismaService,
    ],
    imports: [CaslModule],
})
export class ArticleModule {}
