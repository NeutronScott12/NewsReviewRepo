import { Alert } from '@mui/material'
import React from 'react'

interface ISuccessAlert {
	sucessMessage: string
	checkSucess: boolean
}

export const SucessAlert: React.FC<ISuccessAlert> = ({
	sucessMessage,
	checkSucess,
}) => {
	return (
		<span>
			{checkSucess ? (
				<Alert severity="success">{sucessMessage}</Alert>
			) : null}{' '}
			<br />
		</span>
	)
}
