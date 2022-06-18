import React from 'react'
import { Navigate } from 'react-router-dom'
// import { useLoggedIn } from '../utils/hooks/customApolloHooks'
// import { usefetchCurrentUser } from '../utils/hooks/fetchCurrentUser'

interface IProps {
	children: React.ReactNode
}

export const ProtectedRoute: React.FC<IProps> = ({ children }) => {
	// const currentUser = usefetchCurrentUser()
	// const { data } = useLoggedIn()

	//@TODO: DON'T RELY ON LOCAL STORAGE, PROBLEMS ARISE

	if (localStorage.getItem('isLoggedIn') === 'false') {
		return <Navigate to="/login" />
	}

	return <div>{children}</div>
}
