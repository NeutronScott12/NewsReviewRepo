import { CacheModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

import { asyncJwtModuleOption } from '../../configs/jwt.config'
import { cacheConfigAsync } from '../../configs/cache.config'
import { configOptions } from '../../configs'
import { JwtStrategy } from './JwtStrategy'

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync(asyncJwtModuleOption),
        // CacheModule.registerAsync(cacheConfigAsync),
    ],
    providers: [JwtStrategy],
})
export class AuthModule {}
