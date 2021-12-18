import { Module } from '@nestjs/common'
import { ReviewService } from './services/review.service'
import { ReviewResolver } from './resolvers/review.resolver'

@Module({
    providers: [ReviewResolver, ReviewService],
})
export class ReviewModule {}
