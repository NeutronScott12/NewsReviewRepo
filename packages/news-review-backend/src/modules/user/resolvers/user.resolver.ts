import { InternalServerErrorException } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
    ICurrentUser,
    StandardResponseModel,
} from '@thelasthurrah/the-last-hurrah-shared'

import { CurrentUser } from '../../auth/guards'
import { CreateUserInput } from '../dtos/inputs/create-user.input'
import { UpdateUserInput } from '../dtos/inputs/update_user.input'
import { UserResponse } from '../dtos/response/user.response'
import { UserEntity } from '../entities/user.entity'
import { UserService } from '../services/user.service'

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => UserResponse)
    async fetch_current_user(
        @CurrentUser() { user_id }: ICurrentUser,
    ): Promise<UserResponse> {
        try {
            return this.userService.fetchOne({
                where: {
                    binary_auth_id: user_id,
                },
            })
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    @Mutation(() => StandardResponseModel)
    async create_user(
        @Args('createUserInput')
        args: CreateUserInput,
        @CurrentUser() { user_id, username }: ICurrentUser,
    ): Promise<StandardResponseModel> {
        try {
            console.log(user_id, username)

            return this.userService.createUser(args, user_id)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    @Mutation(() => StandardResponseModel)
    async update_user(
        @Args('updateUserInput')
        args: UpdateUserInput,
        @CurrentUser() { user_id, username }: ICurrentUser,
    ): Promise<StandardResponseModel> {
        try {
            await this.userService.updateUser(args, user_id)

            return {
                success: true,
                message: 'Profile updated',
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
