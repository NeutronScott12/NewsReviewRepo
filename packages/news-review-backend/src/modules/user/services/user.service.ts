import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { StandardResponseModel } from '@thelasthurrah/the-last-hurrah-shared'
import { PrismaService } from '../../../prisma/prisma.service'
import { CreateUserInput } from '../dtos/inputs/create-user.input'
import { UpdateUserInput } from '../dtos/inputs/update_user.input'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    fetchOne(args: Prisma.UserFindUniqueArgs) {
        return this.prismaService.user.findUnique(args)
    }

    createOne(args: Prisma.UserCreateArgs) {
        try {
            return this.prismaService.user.create(args)
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    updateOne(args: Prisma.UserUpdateArgs) {
        try {
            return this.prismaService.user.update(args)
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    deleteOne(args: Prisma.UserDeleteArgs) {
        try {
            return this.prismaService.user.delete(args)
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    async createUser(
        { username, first_name, email, last_name }: CreateUserInput,
        user_id: string,
    ): Promise<StandardResponseModel> {
        const found = await this.fetchOne({
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
            await this.createOne({
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
    }

    async updateUser(args: UpdateUserInput, user_id: string) {
        return this.updateOne({
            where: {
                binary_auth_id: user_id,
            },
            data: {
                ...args,
            },
        })
    }
}
