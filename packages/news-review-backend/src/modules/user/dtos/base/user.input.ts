import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserInput {
    @Field({ nullable: true })
    email: string
    @Field({ nullable: true })
    password: string
    @Field({ nullable: true })
    first_name: string
    @Field({ nullable: true })
    last_name: string
    @Field({ nullable: true })
    username: string
}
