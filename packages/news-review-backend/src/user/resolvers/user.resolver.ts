import { InternalServerErrorException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import {
    ICurrentUser,
    StandardResponseModel,
} from '@thelasthurrah/the-last-hurrah-shared'
import { CurrentUser, GqlAuthGuard } from '../../auth/guards'
import { CreateUserInput } from '../dtos/inputs/create-user.input'
import { UserEntity } from '../entities/user.entity'
import { UserService } from '../services/user.service'

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Mutation(() => StandardResponseModel)
    @UseGuards(GqlAuthGuard)
    async create_user(
        @Args('createUserInput')
        { first_name, last_name }: CreateUserInput,
        @CurrentUser() { user_id, username }: ICurrentUser,
    ): Promise<StandardResponseModel> {
        try {
            console.log(user_id, username)

            const found = await this.userService.fetchOne({
                where: {
                    binary_auth_id: user_id,
                },
            })

            if (found) {
                return {
                    success: true,
                    message: 'User already exists',
                }
            } else {
                await this.userService.createOne({
                    data: {
                        first_name,
                        last_name,
                        username,
                        binary_auth_id: user_id,
                    },
                })

                return {
                    success: true,
                    message: 'User created',
                }
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
