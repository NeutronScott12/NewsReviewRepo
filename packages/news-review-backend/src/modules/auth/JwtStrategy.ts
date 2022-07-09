import {
    CACHE_MANAGER,
    ForbiddenException,
    // ForbiddenException,
    Inject,
    Injectable,
} from '@nestjs/common'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Cache } from 'cache-manager'

import { AUTHENTICATION_CACHE_KEY, USER_NOT_VERIFIED } from '../../constants'

// import { AUTHENTICATION_CACHE_KEY, USER_NOT_VERIFIED } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // @Inject(CACHE_MANAGER) private cacheManager: Cache,
        configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        })
    }

    async validate(payload: any) {
        console.log('PAYLOAD', payload)
        return payload
        //     try {
        //         const result = await this.cacheManager.get<{
        //             user: {
        //                 confirmed: boolean
        //                 id: string
        //                 email: string
        //             }
        //         }>(`${AUTHENTICATION_CACHE_KEY}:${payload.id}`)
        //         if (result.user.confirmed) {
        //             return { id: result.user.id, email: result.user.email }
        //         } else {
        //             throw new ForbiddenException({
        //                 success: false,
        //                 details: USER_NOT_VERIFIED,
        //             })
        //         }
        //     } catch (error) {
        //         throw new ForbiddenException({
        //             success: false,
        //             details: error.details,
        //         })
        //     }
    }
}
