import { QueryHookOptions, useQuery } from '@apollo/client'
import { IS_LOGGED_IN } from '../../apollo/typeDefs'
import { ILoggedIn } from '../../types'

export const useLoggedIn = (baseOptions?: QueryHookOptions) =>
	useQuery<ILoggedIn>(IS_LOGGED_IN, baseOptions)
