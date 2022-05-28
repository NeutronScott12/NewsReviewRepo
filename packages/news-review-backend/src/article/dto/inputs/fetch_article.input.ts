import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FetchArticleInput {
    @Field(() => String)
    id: string

    @Field(() => String)
    title: string
}
