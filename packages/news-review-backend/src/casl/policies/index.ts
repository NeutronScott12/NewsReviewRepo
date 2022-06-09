import { SetMetadata } from '@nestjs/common'
import { AppAbility } from '../casl-ability.factory'

interface IPolicyHandler {
    handle(ability: typeof AppAbility): boolean
}

type PolicyHandlerCallback = (ability: typeof AppAbility) => boolean

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback

export const CHECK_POLICIES_KEY = 'check_policy'

export const CheckPolicies = (...handlers: PolicyHandler[]) =>
    SetMetadata(CHECK_POLICIES_KEY, handlers)
