import { useState } from 'react'

export const useErrorAndSuccess = () => {
	const [checkError, setError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [checkSuccess, setSuccess] = useState(false)
	const [successMessage, setSuccessMessage] = useState('')

	return {
		checkError,
		setError,
		errorMessage,
		setErrorMessage,
		checkSuccess,
		setSuccess,
		successMessage,
		setSuccessMessage,
	}
}
