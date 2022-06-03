import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FetchArticleInput {
    @Field(() => String, { nullable: true })
    id: string

    @Field(() => String)
    title: string
}
