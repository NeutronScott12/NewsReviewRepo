import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { CommentContainer } from '../../Comments/CommentContainer'

interface IArticleView {
	title: string
	plain_text_body: string
	json_body: Node[]
	first_name: string
	last_name: string
	slug: string
}

export const ArticleView: React.FC<IArticleView> = ({
	title,
	plain_text_body,
	first_name,
	last_name,
	slug,
}) => {
	return (
		<div>
			<h1>{title}</h1>
			<Link to={`/article/update/${slug}`}>
				<Button>Edit Article</Button>
			</Link>

			<h3>Published</h3>
			<h3>
				Written By: {first_name} {last_name}
			</h3>
			<p>{plain_text_body}</p>

			<CommentContainer title={title} />
		</div>
	)
}
