import React, { useLayoutEffect } from 'react'
import { useBinaryQueries } from '@thelasthurrah/authentication_api'

import { Header } from './partials/Header'
import { SiteRouter } from './router'
import { cache } from './apollo/cache'
import { IS_LOGGED_IN } from './apollo/typeDefs'
import { LoadingComponent } from './partials/Loading'
import { Container } from '@mui/material'

function App() {
	const client = useBinaryQueries()
	const [loaded, setLoaded] = React.useState(true)

	useLayoutEffect(() => {
		const fetchUser = async () => {
			const result = await client.currentUser()

			if (result.data.current_user) {
				cache.writeQuery({
					query: IS_LOGGED_IN,
					data: {
						isLoggedIn: true,
					},
				})

				setLoaded(false)
			}
			setLoaded(false)
		}

		fetchUser().catch((error) => {
			console.log('ERROR', error)
			setLoaded(false)
		})
	}, [])

	return loaded ? (
		<LoadingComponent />
	) : (
		<div>
			<Header />
			<Container>
				<SiteRouter />
			</Container>
		</div>
	)
}

export default App
