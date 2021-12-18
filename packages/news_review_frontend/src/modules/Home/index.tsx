import { Container, Grid } from '@mui/material'
import React from 'react'

export const HomeLayout = () => {
	return (
		<Container>
			<h2>Home Layout</h2>
			<Grid container spacing={2} columns={{ xs: 12, sm: 8, md: 12 }}>
				<Grid style={{ background: 'red' }} item xs={12} sm={4} md={6}>
					Articles
				</Grid>
				<Grid style={{ background: 'blue' }} item xs={12} sm={4} md={6}>
					Reviews
				</Grid>
			</Grid>
		</Container>
	)
}
