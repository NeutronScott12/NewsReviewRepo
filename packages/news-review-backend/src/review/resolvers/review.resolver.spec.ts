import { Test, TestingModule } from '@nestjs/testing'
import { ReviewResolver } from '../resolvers/review.resolver'
import { ReviewService } from '../services/review.service'

describe('ReviewResolver', () => {
    let resolver: ReviewResolver

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReviewResolver, ReviewService],
        }).compile()

        resolver = module.get<ReviewResolver>(ReviewResolver)
    })

    it('should be defined', () => {
        expect(resolver).toBeDefined()
    })
})
