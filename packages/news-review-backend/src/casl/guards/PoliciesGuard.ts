import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CaslAbilityFactory, AppAbility } from '../casl-ability.factory'
import { CHECK_POLICIES_KEY, PolicyHandler } from '../policies'

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const policyHandlers =
            this.reflector.get<PolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler(),
            ) || []

        const ctx = GqlExecutionContext.create(context)
        const user = ctx.getContext().req.user
        console.log('POLICY_GUARD_REQ', user)
        const ability = this.caslAbilityFactory.createForUser(user)

        return policyHandlers.every((handler) =>
            //@ts-ignore
            this.execPolicyHandler(handler, ability),
        )
    }

    private execPolicyHandler(
        handler: PolicyHandler,
        ability: typeof AppAbility,
    ) {
        if (typeof handler === 'function') {
            return handler(ability)
        }

        return handler.handle(ability)
    }
}
