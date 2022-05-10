import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
	uri: 'http://localhost:4800/graphql',
})

export const client = new ApolloClient({
	link: httpLink,
	cache,
})
