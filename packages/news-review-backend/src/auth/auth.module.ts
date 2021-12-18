import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { asyncJwtModuleOption } from '../configs/jwt.config'
import { JwtStrategy } from './JwtStrategy'

@Module({
    imports: [PassportModule, JwtModule.registerAsync(asyncJwtModuleOption)],
    providers: [ConfigService, JwtStrategy],
})
export class AuthModule {}
