import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModuleOptions, JwtModuleAsyncOptions } from '@nestjs/jwt'
import { configOptions } from './index'

class JwtModuleOption extends ConfigService {
    static getJwtModuleOption(configService: ConfigService): JwtModuleOptions {
        return {
            secret: configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn: configService.get('JWT_EXPIRES_IN'),
            },
        }
    }
}

export const asyncJwtModuleOption: JwtModuleAsyncOptions = {
    inject: [ConfigService],
    imports: [ConfigModule.forRoot(configOptions)],
    useFactory: (configService: ConfigService) => {
        return JwtModuleOption.getJwtModuleOption(configService)
    },
}
