import {
	ApolloClient,
	ApolloError,
	ApolloQueryResult,
	gql,
	NormalizedCacheObject,
} from '@apollo/client'
import { FetchCommentsQuery, FetchCommentsDocument } from '../generated/graphql'

export const CurrentUserDocument = gql`
	query CurrentUser {
		current_user {
			id
			username
		}
	}
`

export type CurrentUserQuery = {
	__typename?: 'Query'
	current_user: { __typename?: 'UserModel'; id: string; username: string }
}

export class CommentQueries {
	public client: ApolloClient<NormalizedCacheObject>

	constructor(client: ApolloClient<NormalizedCacheObject>) {
		this.client = client
	}

	public async fetch_comemnts(): Promise<
		ApolloQueryResult<FetchCommentsQuery>
	> {
		try {
			console.log('FETCH_COMEMNT_CLIENT', this.client)
			console.log('FETCH_COMMENT_CLIENT_QUERY', this.client.query)

			const result = await this.client.query<CurrentUserQuery>({
				query: CurrentUserDocument,
			})

			const response = await this.client.query<FetchCommentsQuery>({
				query: FetchCommentsDocument,
			})

			console.log('result', result)
			console.log('response', response)

			return response
		} catch (error) {
			console.log('ERROR', error)
			if (error instanceof ApolloError) {
				throw new ApolloError(error)
			}

			throw new Error(
				`Something really bad happened at fetch_comments - ${error}`
			)
		}
	}
}
