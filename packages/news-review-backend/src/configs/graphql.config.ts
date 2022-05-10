import {
    ApolloDriver,
    ApolloDriverAsyncConfig,
    ApolloDriverConfig,
} from '@nestjs/apollo'
import { ConfigService } from '@nestjs/config'
import { join } from 'path/posix'

export class GraphqlConfig extends ConfigService {
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
    imports: [ConfigService],
    useFactory: async (configService: ConfigService) =>
        GraphqlConfig.getGraphqConfig(configService),
    inject: [ConfigService],
}
