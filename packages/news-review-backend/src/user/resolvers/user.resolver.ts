import { InternalServerErrorException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
    GqlAuthGuard,
    ICurrentUser,
} from '@thelasthurrah/the-last-hurrah-shared'
import { CurrentUser } from 'src/auth/guards'
import { CreateUserInput } from '../dtos/inputs/create-user.input'
import { UserEntity } from '../entities/user.entity'
import { UserService } from '../services/user.service'

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => UserEntity)
    @UseGuards(GqlAuthGuard)
    create_user(
        @Args('createUserInput')
        { first_name, last_name }: CreateUserInput,
        @CurrentUser() { id, username }: ICurrentUser,
    ) {
        try {
            return this.userService.createOne({
                data: { first_name, last_name, username, binary_auth_id: id },
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
