import React from 'react'
import { useParams } from 'react-router-dom'
import { SpinningComponent } from '../../../common/Spinner'

import { useFetchOneArticleQuery } from '../../../generated/graphql'

export const ArticleContainer = () => {
	const { title } = useParams() as { title: string }

	const { data, loading } = useFetchOneArticleQuery({
		variables: {
			fetchArticleInput: {
				title,
			},
		},
	})

	return loading ? (
		<SpinningComponent />
	) : (
		<div>
			<h1>{data?.fetch_one_article.title}</h1>
			<h2>Written By: {data?.fetch_one_article.author.first_name}</h2>
			<p>{data?.fetch_one_article.body}</p>
		</div>
	)
}
