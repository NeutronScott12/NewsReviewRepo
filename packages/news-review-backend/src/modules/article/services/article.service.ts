import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '../../../prisma/prisma.service'

@Injectable()
export class ArticleService {
    constructor(private prismaService: PrismaService) {}

    create(args: Prisma.ArticleCreateArgs) {
        try {
            return this.prismaService.article.create(args)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    fetchMany(args: Prisma.ArticleFindManyArgs) {
        try {
            return this.prismaService.article.findMany(args)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    fetchOne(args: Prisma.ArticleFindFirstArgs) {
        try {
            return this.prismaService.article.findFirst(args)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    updateOne(args: Prisma.ArticleUpdateArgs) {
        try {
            return this.prismaService.article.update(args)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    updateMany(args: Prisma.ArticleUpdateManyArgs) {
        try {
            return this.prismaService.article.updateMany(args)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    deleteOne(args: Prisma.ArticleDeleteArgs) {
        try {
            return this.prismaService.article.delete(args)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    deleteMany(args: Prisma.ArticleDeleteManyArgs) {
        try {
            return this.prismaService.article.deleteMany(args)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
