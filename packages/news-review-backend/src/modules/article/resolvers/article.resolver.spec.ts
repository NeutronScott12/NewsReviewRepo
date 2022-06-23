import { Test, TestingModule } from '@nestjs/testing'
import { ArticleResolver } from './article.resolver'
import { ArticleService } from '../services/article.service'
import { PrismaService } from '../../../prisma/prisma.service'
import { CaslModule } from '../../../casl/casl.module'
import { UserService } from '../../user/services/user.service'

describe('ArticleResolver', () => {
    let resolver: ArticleResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleResolver,
                ArticleService,
                PrismaService,
                UserService,
            ],
            imports: [CaslModule],
        }).compile()

        resolver = module.get<ArticleResolver>(ArticleResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
