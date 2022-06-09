import { InternalServerErrorException } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from '../dtos/inputs/create-user.input'
import { UserEntity } from '../entities/user.entity'
import { UserService } from '../services/user.service'

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserEntity)
    create_user(
        @Args('createUserArgs')
        { first_name, last_name, username }: CreateUserInput,
    ) {
        try {
            return this.userService.createOne({
                data: { first_name, last_name, username },
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
