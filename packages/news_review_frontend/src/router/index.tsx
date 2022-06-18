import * as React from 'react'
import { useRoutes } from 'react-router'

import { ArticleContainer } from '../modules/Articles/containers/ArticleContainer'
import { ForgotPasswordContainer } from '../modules/Authentication/containers/ForgotPassword'
import { LoginContainer } from '../modules/Authentication/containers/Login'
import { RegisterContainer } from '../modules/Authentication/containers/Register'
import { TwoFactorLoginContainer } from '../modules/Authentication/containers/TwoFactorLogin'
import { HomeLayout } from '../modules/Home'
import { useLoggedIn } from '../utils/hooks/customApolloHooks'

export const SiteRouter = () => {
	const { data } = useLoggedIn()

	const routes = useRoutes([
		{
			path: '/',
			element:
				data && data.isLoggedIn !== false ? (
					<HomeLayout />
				) : (
					<LoginContainer />
				),
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
			path: '/forgot_password',
			element: <ForgotPasswordContainer />,
		},
		{
			path: '/2fa',
			element: <TwoFactorLoginContainer />,
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
