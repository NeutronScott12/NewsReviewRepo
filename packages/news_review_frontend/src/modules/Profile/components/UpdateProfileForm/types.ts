type BaseUpdateProfile = {
	first_name?: string | null
	last_name?: string | null
	username?: string | null
	email?: string | null
}

export interface IUpdateProfileFormProps extends BaseUpdateProfile {}

export interface IFormValues {
	first_name: string
	last_name: string
	username: string
	email: string
}
