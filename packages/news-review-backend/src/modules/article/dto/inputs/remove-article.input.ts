import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class RemoveArticleInput {
    @Field(() => String)
    id: string
}
