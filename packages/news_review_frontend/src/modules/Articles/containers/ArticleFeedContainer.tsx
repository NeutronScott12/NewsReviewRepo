import { useQuery } from '@apollo/client'
import React from 'react'
import { useFetchAllArticlesQuery } from '../../../generated/graphql'

export const ArticleFeedContainer = () => {
	const { loading, data } = useFetchAllArticlesQuery()

	console.log('DATA', data)

	return (
		<div>
			<h1>Article Feed</h1>
		</div>
	)
}
