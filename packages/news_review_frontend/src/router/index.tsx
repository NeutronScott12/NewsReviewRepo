import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router'

import { ArticleContainer } from '../modules/Articles/containers/ArticleContainer'
import { CreateArticleContainer } from '../modules/Articles/containers/CreateArticleContainer'
import { ForgotPasswordContainer } from '../modules/Authentication/containers/ForgotPassword'
import { LoginContainer } from '../modules/Authentication/containers/Login'
import { RegisterContainer } from '../modules/Authentication/containers/Register'
import { TwoFactorLoginContainer } from '../modules/Authentication/containers/TwoFactorLogin'
import { HomeLayout } from '../modules/Home'
import { LoadingComponent } from '../partials/Loading'
import { useLoggedIn } from '../utils/hooks/customApolloHooks'
import { ProtectedRoute } from './ProtectedRoute'

const ProfileContainer = lazy(() =>
	import('../modules/Profile/container/ProfileContainer').then((module) => ({
		default: module.ProfileContainer,
	}))
)

const UpdateArticleContainer = lazy(() =>
	import('../modules/Articles/containers/UpdateArticleContainer').then(
		(module) => ({
			default: module.UpdateArticleContainer,
		})
	)
)

export const SiteRouter = () => {
	const { data } = useLoggedIn()

	const routes = useRoutes([
		{
			path: '/',
			element: (
				<ProtectedRoute loggedIn={data?.isLoggedIn}>
					<HomeLayout />
				</ProtectedRoute>
			),
			// data && data.isLoggedIn !== false ? (
			// 	<HomeLayout />
			// ) : (
			// 	<LoginContainer />
			// ),
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
				{
					path: 'create',
					element: <CreateArticleContainer />,
				},
				{
					path: 'update/:slug',
					element: (
						<Suspense fallback={<LoadingComponent />}>
							<UpdateArticleContainer />
						</Suspense>
					),
				},
			],
		},
		{
			path: '/profile',
			element: (
				<Suspense fallback={<LoadingComponent />}>
					<ProfileContainer />,
				</Suspense>
			),
		},
	])

	return routes
}
