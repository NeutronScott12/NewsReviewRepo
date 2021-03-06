import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FetchArticleInput {
    @Field(() => String, { nullable: true })
    id: string

    @Field(() => String, { nullable: true })
    title: string

    @Field(() => String, { nullable: true })
    slug: string
}
