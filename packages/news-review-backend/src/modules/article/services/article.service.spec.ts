import { Test, TestingModule } from '@nestjs/testing'
import { faker } from '@faker-js/faker'

import { ArticleService } from './article.service'
import { UserService } from '../../user/services/user.service'
import { PrismaService } from '../../../prisma/prisma.service'

describe('ArticleService', () => {
    let articleService: ArticleService
    let userService: UserService

    let plain_text_body = faker.lorem.paragraph()
    let title = faker.lorem.word()
    let first_name = faker.name.firstName()
    let last_name = faker.name.lastName()
    let username = faker.internet.userName()

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArticleService, UserService, PrismaService],
        }).compile()

        articleService = module.get<ArticleService>(ArticleService)
        userService = module.get<UserService>(UserService)
    })

    it('should be defined', () => {
        expect(articleService).toBeDefined()
    })

    it('Create One Article', async () => {
        const newArticle = await articleService.create({
            data: {
                plain_text_body,
                json_body: {},
                title,
                slug: title.toLowerCase().replace(/ /g, '-'),
                author: {
                    create: {
                        first_name,
                        last_name,
                        username,
                        binary_auth_id: faker.datatype.uuid(),
                    },
                },
            },
        })

        expect(newArticle.title).toMatch(title)
    })

    it('Find One Article', async () => {
        const article = await articleService.fetchOne({
            where: {
                title,
            },
        })

        expect(article.title).toMatch(title)
    })

    it('Find Many Articles', async () => {
        const articles = await articleService.fetchMany({})

        expect(articles.length).toBeGreaterThan(0)
    })

    // afterAll(async () => {
    //     await userService.deleteOne({ where: { username } })
    // })
})
