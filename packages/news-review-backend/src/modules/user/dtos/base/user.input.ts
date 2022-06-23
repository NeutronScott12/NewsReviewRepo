import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {
    @Field()
    email: string
    @Field()
    first_name: string
    @Field()
    last_name: string
    @Field()
    username: string
}
