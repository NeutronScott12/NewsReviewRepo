import { Field, ObjectType } from '@nestjs/graphql'
import { Article } from '../../article/entities/article.entity'

@ObjectType()
export class UserEntity {
    @Field(() => String)
    id: string

    @Field(() => String)
    username: string

    @Field(() => String)
    first_name: string

    @Field(() => String)
    last_name: string

    @Field(() => [Article])
    articles: Article[]
}
