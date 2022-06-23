type BaseUpdateProfile = {
	first_name?: string | null | undefined
	last_name?: string | null | undefined
	username?: string | null | undefined
	email?: string | null | undefined
}

export interface IUpdateProfileFormProps extends BaseUpdateProfile {}

export interface IFormValues extends BaseUpdateProfile {}
