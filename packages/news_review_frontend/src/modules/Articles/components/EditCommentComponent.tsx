import React from 'react'
import * as yup from 'yup'
import { TextField, Button } from '@mui/material'
import { useBinaryCommentMutations } from '@thelasthurrah/common'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
		const result = await commentApi.editComment({
			comment_id,
			thread_id,
			plain_text_body: data.body,
			json_body: [{}],
		})

		console.log('RESULT', result)
	}

	return (
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
	)
}
