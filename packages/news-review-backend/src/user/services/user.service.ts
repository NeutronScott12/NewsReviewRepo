import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    fetchOne(args: Prisma.UserFindUniqueArgs) {
        try {
            return this.prismaService.user.findUnique(args)
        } catch (error) {
            return new InternalServerErrorException(error)
        }
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
}
