import { Module } from '@nestjs/common'
import { ReviewService } from './services/review.service'
import { ReviewResolver } from './resolvers/review.resolver'
import { PrismaService } from '../prisma/prisma.service'

@Module({
    providers: [ReviewResolver, ReviewService, PrismaService],
})
export class ReviewModule {}
