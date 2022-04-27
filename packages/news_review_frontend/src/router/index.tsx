import * as React from 'react'
import { useRoutes } from 'react-router'

import { LoginContainer } from '../modules/Authentication/containers/Login'
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
	])

	return routes
}
