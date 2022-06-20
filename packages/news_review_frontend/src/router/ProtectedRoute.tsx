import React from 'react'
import { Navigate } from 'react-router-dom'
// import { useLoggedIn } from '../utils/hooks/customApolloHooks'
// import { usefetchCurrentUser } from '../utils/hooks/fetchCurrentUser'

interface IProps {
	children: React.ReactNode
	loggedIn: boolean | undefined
}

export const ProtectedRoute: React.FC<IProps> = ({ children, loggedIn }) => {
	// const currentUser = usefetchCurrentUser()
	// const { data } = useLoggedIn()

	if (loggedIn === false) {
		return <Navigate to="/login" />
	}

	return <div>{children}</div>
}
