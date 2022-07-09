import {
    ApolloDriver,
    ApolloDriverAsyncConfig,
    ApolloDriverConfig,
} from '@nestjs/apollo'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { join } from 'path/posix'
import { configOptions } from './index'

export class GraphqlConfig {
    constructor() {}

    static getGraphqConfig(configService: ConfigService): ApolloDriverConfig {
        return {
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            debug: configService.get('GRAPHQL_DEBUG'),
            playground: configService.get('GRAPHQL_PLAYGROUND'),
            introspection: configService.get('GRAPHQL_INTROSPECTION'),
        }
    }
}

export const asyncGraphqlConfig: ApolloDriverAsyncConfig = {
    driver: ApolloDriver,
    imports: [ConfigModule.forRoot(configOptions)],
    useFactory: (configService: ConfigService) =>
        GraphqlConfig.getGraphqConfig(configService),
    inject: [ConfigService],
    // useExisting: ConfigService
}
