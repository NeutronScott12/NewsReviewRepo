import { Alert } from '@mui/material'
import React from 'react'

interface IErrorAlert {
	errorMessage: string
	checkError: boolean
}

export const ErrorAlert: React.FC<IErrorAlert> = ({
	errorMessage,
	checkError,
}) => {
	return (
		<span>
			{checkError ? <Alert severity="error">{errorMessage}</Alert> : null}{' '}
			<br />
		</span>
	)
}
