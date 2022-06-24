import React from 'react'
import { omit } from 'lodash'

import { useGetCurrentUserQuery } from '../../../generated/graphql'
import { LoadingComponent } from '../../../partials/Loading'
import { UpdateProfileForm } from '../components/UpdateProfileForm/UpdateProfileForm'

export const UpdateProfileContainer = () => {
	const { data, loading } = useGetCurrentUserQuery()

	console.log('data', data)

	if (loading || !data) {
		return <LoadingComponent />
	} else {
		const info = omit(data.fetch_current_user, ['__typename'])

		return <UpdateProfileForm {...info} />
	}
}
