import { ApolloProvider } from '@apollo/client'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import {
	AuthenticationAPI,
	BinaryStashProvider,
} from '@thelasthurrah/authentication_api'
import { CommentAPI, BinaryCommentProvider } from '@thelasthurrah/comment_api'

import './styles.css'

import { client } from './apollo'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = createRoot(document.getElementById('root')!)

const binary_client = new AuthenticationAPI(
	'http://localhost:4000/graphql',
	'first-application'
)

const comment_client = new CommentAPI({
	http_uri: 'http://localhost:4000/graphql',
	web_socket_uri: 'ws://localhost:4003/graphql',
	application_short_name: 'first-application',
})

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Router>
				<BinaryStashProvider client={binary_client}>
					<BinaryCommentProvider client={comment_client}>
						<App />
					</BinaryCommentProvider>
				</BinaryStashProvider>
			</Router>
		</ApolloProvider>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
