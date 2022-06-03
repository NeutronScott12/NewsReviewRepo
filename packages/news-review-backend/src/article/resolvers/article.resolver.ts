import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import {
    // GqlAuthGuard,
    StandardResponseModel,
} from '@thelasthurrah/the-last-hurrah-shared'
import { InternalServerErrorException, UseGuards } from '@nestjs/common'

import { ArticleService } from '../services/article.service'
import { Article } from '../entities/article.entity'
import { CreateArticleInput } from '../dto/inputs/create-article.input'
import { UpdateArticleInput } from '../dto/inputs/update-article.input'
import {
    CurrentUser,
    ICurrentUser,
} from '@thelasthurrah/the-last-hurrah-shared'
import { FetchArticleInput } from '../dto/inputs/fetch_article.input'
import { RemoveArticleInput } from '../dto/inputs/remove-article.input'
import { GqlAuthGuard } from 'src/auth/guards'

@Resolver(() => Article)
export class ArticleResolver {
    constructor(private readonly articleService: ArticleService) {}

    @Mutation(() => Article)
    create_article(
        @Args('createArticleInput') createArticleInput: CreateArticleInput,
        @CurrentUser() user: ICurrentUser,
    ) {
        return this.articleService.create({
            data: {
                ...createArticleInput,
                author: { connect: { id: user.id } },
            },
        })
    }

    // @UseGuards(GqlAuthGuard)
    @Query(() => [Article])
    fetch_all_articles() {
        return this.articleService.fetchMany({ include: { author: true } })
    }

    @Query(() => Article)
    fetch_one_article(
        @Args('fetchArticleInput') { id, title }: FetchArticleInput,
    ) {
        return this.articleService.fetchOne({
            where: { OR: [{ id }, { title }] },
            include: { author: true },
        })
    }

    @Mutation(() => Article)
    updateArticle(
        @Args('updateArticleInput') { id, body, title }: UpdateArticleInput,
    ) {
        return this.articleService.updateOne({
            where: {
                id,
            },
            data: {
                title,
                body,
            },
        })
    }

    @Mutation(() => StandardResponseModel)
    async removeArticle(
        @Args('removeArticleInput') { id }: RemoveArticleInput,
    ): Promise<StandardResponseModel> {
        try {
            await this.articleService.deleteOne({ where: { id } })

            return {
                success: true,
                message: 'Article successfully deleted',
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
