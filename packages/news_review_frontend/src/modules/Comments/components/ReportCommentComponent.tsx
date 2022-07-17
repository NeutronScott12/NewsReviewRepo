import React, { useState } from 'react'
import Select from 'react-select'

import {
	useBinaryCommentQueries,
	useReportComment,
} from '@thelasthurrah/common'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'

import { Button } from '@mui/material'
import { Sort } from './CommentComponent'

export enum Report_Reason {
	Disagree = 'DISAGREE',
	InappropriateProfile = 'INAPPROPRIATE_PROFILE',
	PrivateInformation = 'PRIVATE_INFORMATION',
	Spam = 'SPAM',
	ThreateningContent = 'THREATENING_CONTENT',
}

interface IFormInput {
	report_reason: { label: string; value: Report_Reason }
}

interface IReportCommentComponent {
	comment_id: string
}

export const ReportCommentComponent: React.FC<IReportCommentComponent> = ({
	comment_id,
}) => {
	const [showReport, setShowReport] = useState<boolean>(false)

	const client = useBinaryCommentQueries()
	const [reportComment] = useReportComment({
		thread_id: '50e11d1f-9d10-4688-a110-e02788f331a0',
		application_short_name: 'first-application',
		limit: 10,
		skip: 0,
		sort: Sort.Desc,
		client: client.client,
	})

	const {
		handleSubmit,
		control,
		formState: { isDirty, isSubmitting },
	} = useForm<IFormInput>()

	const report: SubmitHandler<IFormInput> = async (data) => {
		console.log('DATA', data)

		const result = await reportComment({
			variables: {
				createReportInput: {
					comment_id,
					report: data.report_reason.value,
				},
			},
		})

		console.log('RESULT', result)
		setShowReport(false)
	}

	const toggleReport = () => {
		setShowReport(!showReport)
	}

	return (
		<>
			<Button onClick={toggleReport}>Report</Button>
			{showReport ? (
				<form onSubmit={handleSubmit(report)}>
					<Controller
						name="report_reason"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								options={[
									{
										value: Report_Reason.Disagree,
										label: 'Disagree',
									},
									{
										value: Report_Reason.InappropriateProfile,
										label: 'Inappropriate Comment',
									},
									{
										value: Report_Reason.PrivateInformation,
										label: 'Private Information',
									},
									{
										value: Report_Reason.Spam,
										label: 'Spam',
									},
									{
										value: Report_Reason.ThreateningContent,
										label: 'Threatening Content',
									},
								]}
							/>
						)}
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
