import * as React from 'react'
import { useRoutes } from 'react-router'
import { ArticleContainer } from '../modules/Articles/containers/ArticleContainer'

import { LoginContainer } from '../modules/Authentication/containers/Login'
import { RegisterContainer } from '../modules/Authentication/containers/Register'
import { HomeLayout } from '../modules/Home'

export const SiteRouter = () => {
	const routes = useRoutes([
		{
			path: '/',
			element: <HomeLayout />,
		},
		{
			path: '/login',
			element: <LoginContainer />,
		},
		{
			path: '/register',
			element: <RegisterContainer />,
		},
		{
			path: 'article/*',
			children: [
				{
					path: ':title',
					element: <ArticleContainer />,
				},
			],
		},
	])

	return routes
}
