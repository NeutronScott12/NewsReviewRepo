import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions, JwtModuleAsyncOptions } from '@nestjs/jwt'

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
    useFactory: (configService: ConfigService) =>
        JwtModuleOption.getJwtModuleOption(configService),
    imports: [ConfigService],
}
