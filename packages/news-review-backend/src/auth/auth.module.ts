import { CacheModule, Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './JwtStrategy'
import { asyncJwtModuleOption } from 'src/configs/jwt.config'

@Module({
    imports: [PassportModule, JwtModule.registerAsync(asyncJwtModuleOption)],
    providers: [ConfigService, JwtStrategy],
})
export class AuthModule {}
