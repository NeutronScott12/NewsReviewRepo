import React from 'react'
import { omit } from 'lodash'

import { useGetCurrentUserQuery } from '../../../generated/graphql'
import { UpdateProfileForm } from '../components/UpdateProfileForm/UpdateProfileForm'

export const ProfileContainer = () => {
	const { data, loading } = useGetCurrentUserQuery()

	if (loading) {
		return <div>Loading...</div>
	} else {
		const info = omit(data?.fetch_current_user, ['__typename'])

		return <UpdateProfileForm {...info} />
	}
}
