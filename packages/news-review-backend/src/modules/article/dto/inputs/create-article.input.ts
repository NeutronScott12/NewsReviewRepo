import { InputType, Int, Field } from '@nestjs/graphql'

@InputType()
export class CreateArticleInput {
    @Field(() => String, { description: 'Article Title' })
    title: string

    @Field(() => String, { description: 'Body of the Article' })
    body: string
}
