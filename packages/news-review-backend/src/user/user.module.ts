import { Module } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { UserResolver } from './resolvers/user.resolver'
import { UserService } from './services/user.service'

@Module({
    providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
