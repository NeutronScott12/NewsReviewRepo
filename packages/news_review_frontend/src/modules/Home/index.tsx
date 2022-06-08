import React, { useEffect, Suspense } from 'react'
import { CircularProgress, Container, Grid } from '@mui/material'
import { useBinaryQueries } from '@thelasthurrah/authentication_api'

import { ArticleFeedContainer } from '../Articles/containers/ArticleFeedContainer'

export const HomeLayout = () => {
	const client = useBinaryQueries()

	useEffect(() => {
		const fetchUser = async () => {
			const result = await client.currentUser()
		}

		fetchUser().catch(console.error)
	}, [])

	return (
		<Container>
			<h2>Home Layout</h2>
			<Grid container spacing={2} columns={{ xs: 12, sm: 8, md: 12 }}>
				<Grid style={{ background: 'red' }} item xs={12} sm={4} md={6}>
					<Suspense fallback={<CircularProgress />}>
						<ArticleFeedContainer />
					</Suspense>
				</Grid>
				<Grid style={{ background: 'blue' }} item xs={12} sm={4} md={6}>
					Reviews
				</Grid>
			</Grid>
		</Container>
	)
}
