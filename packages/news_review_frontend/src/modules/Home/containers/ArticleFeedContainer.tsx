import React from 'react'
import { CircularProgress } from '@mui/material'
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
					<Link to={`/article/${article.slug}`}>
						<h2>{article.title}</h2>
					</Link>
				</div>
			))}
		</div>
	)
}
