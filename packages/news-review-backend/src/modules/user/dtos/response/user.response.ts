import { ObjectType, OmitType, PartialType } from '@nestjs/graphql'
import { UserEntity } from '../../entities/user.entity'

@ObjectType({})
export class UserResponse extends PartialType(
    OmitType(UserEntity, ['articles', 'role'] as const),
) {}
