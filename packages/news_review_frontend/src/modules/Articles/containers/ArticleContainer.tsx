import React from 'react'
import { useParams } from 'react-router-dom'
import { SpinningComponent } from '../../../common/Spinner'

import { useFetchOneArticleQuery } from '../../../generated/graphql'
import { ArticleView } from '../views/ArticlePage'

export const ArticleContainer = () => {
	const { slug } = useParams() as { slug: string }

	const { data, loading } = useFetchOneArticleQuery({
		variables: {
			fetchArticleInput: {
				slug,
			},
		},
	})

	return loading && data === undefined ? (
		<SpinningComponent />
	) : (
		{
			...(data?.fetch_one_article ? (
				<ArticleView
					plain_text_body={data.fetch_one_article.plain_text_body}
					json_body={data.fetch_one_article.json_body}
					title={data.fetch_one_article.title}
					slug={data.fetch_one_article.slug}
					{...data?.fetch_one_article.author}
				/>
			) : (
				<div>Couldn't load article</div>
			)),
		}
	)
}
