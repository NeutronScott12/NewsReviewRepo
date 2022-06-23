import { ObjectType, Field, Int } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { UserEntity } from '../../user/entities/user.entity'

@ObjectType()
export class Article {
    @Field(() => String, { description: 'Article ID' })
    id: string

    @Field(() => String)
    title: string

    @Field(() => String)
    plain_text_body: string

    @Field(() => String)
    slug: string

    @Field(() => [GraphQLJSONObject])
    json_body: object[]

    @Field((type) => Date)
    created_at: Date

    @Field((type) => Date)
    updated_at: Date

    @Field(() => UserEntity)
    author: UserEntity
}
