import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { UpdateArticleComponent } from '../components/UpdateArticleComponent'
import { useFetchOneArticleQuery } from '../../../generated/graphql'
import { LoadingComponent } from '../../../partials/Loading'

export const UpdateArticleContainer = () => {
	const { slug } = useParams() as { slug: string }

	const { data } = useFetchOneArticleQuery({
		variables: { fetchArticleInput: { slug } },
	})

	console.log('data', data)

	return data ? (
		<UpdateArticleComponent
			value_body={data.fetch_one_article.json_body}
			title={data.fetch_one_article.title}
		/>
	) : (
		<LoadingComponent />
	)
}
