import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'

import { PrismaService } from 'src/prisma/prisma.service'
import { GqlAuthGuard } from '../auth/guards'
import { UserResolver } from './resolvers/user.resolver'
import { UserService } from './services/user.service'

@Module({
    providers: [
        { provide: APP_GUARD, useClass: GqlAuthGuard },
        UserResolver,
        UserService,
        PrismaService,
    ],
})
export class UserModule {}
