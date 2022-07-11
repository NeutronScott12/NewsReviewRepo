import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { BinaryStashClient, BinaryStashProvider } from '@thelasthurrah/common'

import './styles.css'

import { apollo_client } from './apollo'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root')!)

const binary_stash_client = new BinaryStashClient({
	application_short_name: 'first-application',
	http_uri: 'http://localhost:4000/graphql',
	ws_uri: 'ws://localhost:4003/graphql',
})

root.render(
	<React.StrictMode>
		<ApolloProvider client={apollo_client}>
			<Router>
				<BinaryStashProvider client={binary_stash_client}>
					<App />
				</BinaryStashProvider>
			</Router>
		</ApolloProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
