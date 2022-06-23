import { InputType } from '@nestjs/graphql'
import { UserInput } from '../base/user.input'

@InputType()
export class CreateUserInput extends UserInput {}
