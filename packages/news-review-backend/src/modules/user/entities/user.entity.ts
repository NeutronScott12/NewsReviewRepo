import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Roles } from '@prisma/client'
import { Article } from '../../article/entities/article.entity'

registerEnumType(Roles, {
    name: 'ROLES',
})

@ObjectType()
export class UserEntity {
    @Field(() => String)
    id: string

    @Field(() => String)
    username: string

    @Field(() => String, { nullable: true })
    email: string

    @Field(() => String)
    first_name: string

    @Field(() => String)
    last_name: string

    @Field(() => [Article])
    articles: Article[]

    @Field((type) => Roles)
    role: Roles
}
