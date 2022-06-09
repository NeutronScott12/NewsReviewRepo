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
import { PoliciesGuard } from '../../casl/guards/PoliciesGuard'
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory'
import { UserService } from 'src/user/services/user.service'

@Resolver(() => Article)
export class ArticleResolver {
    constructor(
        private readonly articleService: ArticleService,
        private caslAbilityFactory: CaslAbilityFactory,
        private userService: UserService,
    ) {}

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
    fetch_all_articles(@CurrentUser() user: ICurrentUser) {
        console.log('user', user)
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

    // @UseGuards(PoliciesGuard)
    @Mutation(() => Article)
    async updateArticle(
        @Args('updateArticleInput') { id, body, title }: UpdateArticleInput,
        @CurrentUser() user: ICurrentUser,
    ) {
        const userEntity = await this.userService.fetchOne({
            where: { id: user.id },
            include: { articles: true },
        })

        //@ts-ignore
        const ability = this.caslAbilityFactory.createForUser(userEntity)

        return this.articleService.updateOne({
            where: {
                id,
            },
            data: {
                title,
                body,
            },
            include: { author: true },
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
