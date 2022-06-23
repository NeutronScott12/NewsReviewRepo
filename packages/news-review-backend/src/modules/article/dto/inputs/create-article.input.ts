import { InputType, Field } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'

@InputType()
export class CreateArticleInput {
    @Field(() => String, { description: 'Article Title' })
    title: string

    @Field(() => String, { description: 'Body of the Article' })
    plain_text_body: string

    @Field(() => [GraphQLJSONObject], {
        description: 'JSON Body of the Article',
    })
    json_body: object
}
