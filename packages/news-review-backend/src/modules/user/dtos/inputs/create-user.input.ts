import { InputType, PartialType } from '@nestjs/graphql'
import { UserInput } from '../base/user.input'

@InputType()
export class CreateUserInput extends PartialType(UserInput) {}
