import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [ArticleModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
