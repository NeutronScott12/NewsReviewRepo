import React from 'react'
import { omit } from 'lodash'

import { useGetCurrentUserQuery } from '../../../generated/graphql'
import { UpdateProfileForm } from '../components/UpdateProfileForm/UpdateProfileForm'
import { LoadingComponent } from '../../../partials/Loading'
import { ProfilePage } from '../views/ProfileView'

export const ProfileContainer = () => {
	const { data, loading } = useGetCurrentUserQuery()

	if (loading || !data) {
		return <LoadingComponent />
	} else {
		const info = omit(data.fetch_current_user, ['__typename'])

		return <ProfilePage {...info} />
	}
}
