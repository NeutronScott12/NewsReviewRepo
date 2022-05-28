import { CreateArticleInput } from './create-article.input'
import { Field, InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
    @Field(() => String)
    id: string
}
