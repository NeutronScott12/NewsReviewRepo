import { ConfigService } from '@nestjs/config'
import { GqlModuleAsyncOptions, GqlModuleOptions } from '@nestjs/graphql'
import { join } from 'path/posix'

export class GraphqlConfig extends ConfigService {
    static getGraphqConfig(configService: ConfigService): GqlModuleOptions {
        return {
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            debug: configService.get('GRAPHQL_DEBUG'),
            playground: configService.get('GRAPHQL_PLAYGROUND'),
            introspection: configService.get('GRAPHQL_INTROSPECTION'),
        }
    }
}

export const asyncGraphqlConfig: GqlModuleAsyncOptions = {
    imports: [ConfigService],
    useFactory: async (configService: ConfigService) =>
        GraphqlConfig.getGraphqConfig(configService),
    inject: [ConfigService],
}
