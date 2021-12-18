import * as React from 'react'
import { useRoutes } from 'react-router'
import { HomeLayout } from '../modules/Home'

export const SiteRouter = () => {
	const routes = useRoutes([
		{
			path: '/',
			element: <HomeLayout />,
		},
	])

	return routes
}
