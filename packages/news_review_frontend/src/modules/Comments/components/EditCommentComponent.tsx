import React, { useState } from 'react'
import * as yup from 'yup'
import { TextField, Button } from '@mui/material'
import {
	useBinaryCommentMutations,
	useEditComment,
} from '@thelasthurrah/common'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Sort } from './CommentComponent'

interface IFormInput {
	body: string
}

const schema = yup.object({
	body: yup.string().required(),
})

interface IEditCommentComponent {
	comment_id: string
	thread_id: string
	comment_body: any
}

export const EditCommmentComponent: React.FC<IEditCommentComponent> = ({
	comment_id,
	thread_id,
	comment_body,
}) => {
	const commentApi = useBinaryCommentMutations()
	const [toggleDisplay, setToggleDisplay] = useState(false)

	const [editComment] = useEditComment({
		application_short_name: 'first-application',
		limit: 10,
		skip: 0,
		sort: Sort.Desc,
		thread_id,
		client: commentApi.client,
	})

	const toggleEdit = () => {
		setToggleDisplay(!toggleDisplay)
	}

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting, isDirty },
		control,
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
		defaultValues: {
			body: comment_body,
		},
	})

	// console.log('ERRRO', errors)

	const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
		const result = await editComment({
			variables: {
				UpdateCommentInput: {
					plain_text_body: data.body,
					json_body: [{}],
					comment_id,
				},
			},
		})

		setToggleDisplay(false)

		console.log('RESULT', result)
	}

	return (
		<>
			<Button onClick={toggleEdit}>Edit</Button>
			{toggleDisplay ? (
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* <Controller
				name="body"
				control={control}
				render={({ field }) => (
					<TextField {...field} label={field.name} />
				)}
			/> */}
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
