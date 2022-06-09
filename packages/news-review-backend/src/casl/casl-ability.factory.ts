import { AbilityBuilder, AbilityClass, ExtractSubjectType } from '@casl/ability'
import { PrismaAbility, Subjects } from '@casl/prisma'
import { Article, Review, User } from '@prisma/client'
import { UserEntity } from 'src/user/entities/user.entity'
// import { Article } from '../article/entities/article.entity'
// import { UserEntity } from '../user/entities/user.entity'
import { Action } from './enums'

type AppAbility = PrismaAbility<
    [
        string,
        Subjects<{
            Review: Review
            Article: Article
            User: User
        }>,
    ]
>
export const AppAbility = PrismaAbility as AbilityClass<AppAbility>

export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder(AppAbility)

        if (user.role === 'ADMIN') {
            can(Action.Manage, 'Article')
        } else {
            can(Action.Read, 'Article')
        }

        console.log('CASL_USER', user)

        can(Action.Update, 'Article', { author: { id: user.id } })
        // cannot(Action.Delete, Article, { author: { $ne: { author: user.id } } })

        return build({
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<{
                    Review: Review
                    Article: Article
                    User: User
                }>,
        })
    }
}
