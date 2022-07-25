import { Reply } from '@mui/icons-material'
import { Button, TextField } from '@mui/material'
import {
	useBinaryCommentQueries,
	useCreateReplyComment,
} from '@thelasthurrah/common'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Sort } from './CommentComponent'

interface IFormValues {
	body: string
}

interface ICreateReplyComponent {
	thread_id: string
	parent_id: string
	replied_to_id: string
}

export const CreateReplyComponent: React.FC<ICreateReplyComponent> = ({
	thread_id,
	parent_id,
	replied_to_id,
}) => {
	const [reply, toggleReply] = useState<boolean>(false)
	const binaryContext = useBinaryCommentQueries()
	const [createReply] = useCreateReplyComment({
		client: binaryContext.client,
		application_short_name: 'first-application',
		limit: 10,
		skip: 0,
		sort: Sort.Desc,
		thread_id,
	})

	const {
		handleSubmit,
		register,
		formState: { isDirty, isSubmitting },
	} = useForm<IFormValues>({
		defaultValues: { body: '' },
	})

	const onSubmit: SubmitHandler<IFormValues> = async (data) => {
		console.log('DATA', data)
		const result = await createReply({
			variables: {
				CreateReplyCommentInput: {
					plain_text_body: data.body,
					json_body: [{}],
					application_id: 'd2f58a0e-8d88-4677-90f4-915a4d333401',
					thread_id,
					parent_id,
					replied_to_id,
				},
			},
		})

		console.log('RESULT', result)
	}

	return (
		<>
			<Button onClick={() => toggleReply(!reply)}>Reply</Button>
			{reply ? (
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
			) : null}
		</>
	)
}
