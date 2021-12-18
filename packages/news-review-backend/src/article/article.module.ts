import { Module } from '@nestjs/common'
import { ArticleService } from './services/article.service'
import { ArticleResolver } from './resolvers/article.resolver'

@Module({
    providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
