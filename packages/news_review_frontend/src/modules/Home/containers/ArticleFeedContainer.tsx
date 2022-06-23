import { useQuery } from '@apollo/client'
import { CircularProgress } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useFetchAllArticlesQuery } from '../../../generated/graphql'

export const ArticleFeedContainer = () => {
	const { loading, data } = useFetchAllArticlesQuery()

	return loading ? (
		<CircularProgress />
	) : (
		<div>
			<h1>Article Feed</h1>
			{data?.fetch_all_articles.map((article) => (
				<div key={article.id}>
					<Link to={`/article/${article.title}`}>
						<h2>{article.title}</h2>
					</Link>
				</div>
			))}
		</div>
	)
}
