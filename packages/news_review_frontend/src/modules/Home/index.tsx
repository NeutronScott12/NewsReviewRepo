import React, { useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import { ArticleFeedContainer } from '../Articles/containers/ArticleFeedContainer'
import { AuthenticationAPI } from '@thelasthurrah/authentication_api'

export const HomeLayout = () => {
	useEffect(() => {
		const fetchUser = async () => {
			// const response = new AuthenticationAPI(
			// 	'http://localhost:4000/graphql',
			// 	'first-application'
			// )
			// const result = await response.queries.currentUser()
			// console.log(result)
		}

		fetchUser().catch(console.error)
	}, [])

	return (
		<Container>
			<h2>Home Layout</h2>
			<Grid container spacing={2} columns={{ xs: 12, sm: 8, md: 12 }}>
				<Grid style={{ background: 'red' }} item xs={12} sm={4} md={6}>
					<ArticleFeedContainer />
				</Grid>
				<Grid style={{ background: 'blue' }} item xs={12} sm={4} md={6}>
					Reviews
				</Grid>
			</Grid>
		</Container>
	)
}
