import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import {
    ForbiddenException,
    InternalServerErrorException,
} from '@nestjs/common'

import { ArticleService } from '../services/article.service'
import { Article } from '../entities/article.entity'
import { CreateArticleInput } from '../dto/inputs/create-article.input'
import { UpdateArticleInput } from '../dto/inputs/update-article.input'
import {
    CurrentUser,
    ICurrentUser,
} from '@thelasthurrah/the-last-hurrah-shared'
import { StandardResponseModel } from '../../../common/types'

import { FetchArticleInput } from '../dto/inputs/fetch_article.input'
import { RemoveArticleInput } from '../dto/inputs/remove-article.input'
import { CaslAbilityFactory } from '../../../casl/casl-ability.factory'
import { UserService } from '../../user/services/user.service'
import { createSlug } from '../helpers'

@Resolver(() => Article)
export class ArticleResolver {
    constructor(
        private readonly articleService: ArticleService,
        private caslAbilityFactory: CaslAbilityFactory,
        private userService: UserService,
    ) {}

    @Mutation(() => Article)
    async create_article(
        @Args('createArticleInput') createArticleInput: CreateArticleInput,
        @CurrentUser() user: ICurrentUser,
    ) {
        const userEntity = await this.userService.fetchOne({
            where: { binary_auth_id: user.user_id },
        })

        if (userEntity.fully_registered === false) {
            throw new ForbiddenException(
                'You must be fully registered to create an article',
            )
        }

        //@TODO - Instead of using binary ID, we could setup a cookie or session holding the user ID
        return this.articleService.create({
            data: {
                ...createArticleInput,
                slug: createSlug(createArticleInput.title),
                author: { connect: { binary_auth_id: user.user_id } },
            },
            include: { author: true },
        })
    }

    // @UseGuards(GqlAuthGuard)
    @Query(() => [Article])
    fetch_all_articles(@CurrentUser() user: ICurrentUser) {
        console.log('user', user)
        return this.articleService.fetchMany({ include: { author: true } })
    }

    @Query(() => Article)
    async fetch_one_article(
        @Args('fetchArticleInput') { id, title, slug }: FetchArticleInput,
    ) {
        console.log('slug', slug)

        const article = await this.articleService.fetchOne({
            where: { OR: [{ id }, { title }, { slug }] },
            include: { author: true },
        })

        console.log('article', article)

        return article
    }

    // @UseGuards(PoliciesGuard)
    @Mutation(() => Article)
    async update_article(
        @Args('updateArticleInput')
        { plain_text_body, title, json_body, id }: UpdateArticleInput,
        @CurrentUser() user: ICurrentUser,
    ) {
        const article = await this.articleService
            .fetchOne({
                where: {
                    id,
                },
            })
            .author()

        console.log('article', article)

        if (article.binary_auth_id !== user.user_id) {
            throw new ForbiddenException({
                message: "You don't have permission to update this article",
            })
        }

        //@ts-ignore
        // const ability = this.caslAbilityFactory.createForUser(userEntity)

        return this.articleService.updateOne({
            where: {
                id,
            },
            data: {
                slug: createSlug(title),
                title: title,
                plain_text_body,
                json_body,
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
