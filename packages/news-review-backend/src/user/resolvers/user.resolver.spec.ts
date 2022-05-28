import { Test, TestingModule } from '@nestjs/testing'

import { PrismaService } from '../../prisma/prisma.service'
import { UserService } from '../services/user.service'
import { UserResolver } from './user.resolver'

describe('UserResolver', () => {
    let resolver: UserResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserResolver, UserService, PrismaService],
        }).compile()

        resolver = module.get<UserResolver>(UserResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
