import React, { useLayoutEffect } from 'react'
import { useBinaryQueries } from '@thelasthurrah/authentication_api'

import { Header } from './partials/Header'
import { SiteRouter } from './router'

function App() {
	const client = useBinaryQueries()

	useLayoutEffect(() => {
		const fetchUser = async () => {
			const result = await client.currentUser()
			console.log('RESULT', result)
		}

		fetchUser().catch(console.error)
	}, [])

	return (
		<div className="App">
			<Header />
			<SiteRouter />
		</div>
	)
}

export default App
