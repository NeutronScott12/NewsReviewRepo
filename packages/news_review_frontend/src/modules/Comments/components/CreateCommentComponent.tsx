import React from 'react'
import { Button, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
	useBinaryCommentQueries,
	useCreateComment,
} from '@thelasthurrah/common'
import { Sort } from './CommentComponent'

interface ICreateCommentComponent {
	thread_id: string
}

interface IFormInput {
	body: string
}

export const CreateCommentComponent: React.FC<ICreateCommentComponent> = ({
	thread_id,
}) => {
	const client = useBinaryCommentQueries()
	const [createComment] = useCreateComment(
		{
			thread_id: '7f89555c-d436-4f40-ae26-536f314ba3a0',
		},
		{
			application_short_name: 'first-application',
			limit: 10,
			skip: 0,
			sort: Sort.Desc,
			client: client.client,
		}
	)

	const {
		register,
		handleSubmit,
		formState: { isDirty, isSubmitting },
	} = useForm<IFormInput>({
		defaultValues: {
			body: '',
		},
	})

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		const result = await createComment({
			variables: {
				createCommentInput: {
					json_body: [{}],
					plain_text_body: data.body,
					application_id: 'd2f58a0e-8d88-4677-90f4-915a4d333401',
					thread_id,
				},
			},
		})

		console.log('RESULT', result)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField
				autoComplete="off"
				fullWidth
				label="Body"
				{...register('body', { validate: {} })}
				name="body"
				// value={values.body}
				// onChange={handleChange}
				// error={touched.body && Boolean(errors.body)}
				// helperText={touched.body && errors.body}
				style={{ marginBottom: '1rem' }}
			/>
			<Button
				disabled={isSubmitting || isDirty === false}
				color="primary"
				variant="contained"
				fullWidth
				type="submit"
			>
				Submit
			</Button>
		</form>
	)
}
