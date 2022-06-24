import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

interface IProfilePage {
	first_name?: string | null | undefined
	last_name?: string | null | undefined
	email?: string | null | undefined
	username?: string | null | undefined
}

export const ProfilePage: React.FC<IProfilePage> = ({
	first_name,
	last_name,
	email,
	username,
}) => {
	return (
		<div>
			<h2>ProfilePage</h2>

			<h3>
				{first_name} {last_name}
			</h3>
			<h3>{email}</h3>
			<h3>{username}</h3>
			<Link to="/profile/settings">
				<Button>Settings</Button>
			</Link>
		</div>
	)
}
