import { ConfigModuleOptions } from '@nestjs/config'
import * as Joi from 'joi'

const ENV = process.env.NODE_ENV

export const envVariablesSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(4800),
    // DATABASE_URL: Joi.string().required(),
    // JWT_SECRET: Joi.string().required().default('jwt_secret'),
    GRAPHQL_INTROSPECTION: Joi.boolean().required(),
    // REDIS_PORT: Joi.number().required().default(6379),
    // REDIS_HOST: Joi.string().required().default('localhost'),
    GRAPHQL_DEBUG: Joi.boolean().required().default(true),
    GRAPHQL_PLAYGROUND: Joi.boolean().required().default(true),
})

console.log('ENV: ', ENV)

export const configOptions: ConfigModuleOptions = {
    envFilePath: '.env.development',
    // envFilePath:
    //     ENV === 'development' || undefined ? '.env.development' : `.env.${ENV}`,
    isGlobal: true,
    cache: true,
    validationSchema: envVariablesSchema,
    expandVariables: true,
}
