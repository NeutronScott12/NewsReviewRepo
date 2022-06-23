import { ObjectType, Field, Int } from '@nestjs/graphql'
import { UserEntity } from '../../user/entities/user.entity'

@ObjectType()
export class Article {
    @Field(() => String, { description: 'Article ID' })
    id: string

    @Field(() => String)
    title: string

    @Field(() => String)
    body: string

    @Field((type) => Date)
    created_at: Date

    @Field((type) => Date)
    updated_at: Date

    @Field(() => UserEntity)
    author: UserEntity
}
