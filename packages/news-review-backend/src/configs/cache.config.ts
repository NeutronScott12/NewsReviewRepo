import { CacheModuleOptions } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

class CacheConfig {
    static getCacheConfig(configService: ConfigService): CacheModuleOptions {
        return {
            isGlobal: true,
        }
    }
}
