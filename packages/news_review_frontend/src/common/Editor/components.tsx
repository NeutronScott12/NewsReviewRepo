/**
 * Base components for the SlateEditor component.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { useSlate } from 'slate-react'
import { cx, css } from '@emotion/css'
import {
	isBlockActive,
	toggleBlock,
	isMarkActive,
	toggleMark,
	isLinkActive,
	insertLink,
} from './helpers'

interface IProps {
	className?: string
	children: React.ReactNode
}

interface IButtonProps {
	className: string
	active: boolean
	reversed: any
}

export const Button = React.forwardRef(
	({ className, active, reversed, ...props }: IButtonProps, ref) => (
		<span
			{...props}
			//@ts-ignore
			ref={ref}
			className={cx(
				className,
				css`
					cursor: pointer;
					color: ${reversed
						? active
							? 'white'
							: '#aaa'
						: active
						? 'black'
						: '#ccc'};
				`
			)}
		/>
	)
)

interface IconProps {
	className?: string
	children: React.ReactNode
}

export const Icon = React.forwardRef(
	({ className, ...props }: IconProps, ref) => (
		<span
			{...props}
			//@ts-ignore
			ref={ref}
			className={cx(
				'material-icons',
				className,
				css`
					font-size: 24px;
					vertical-align: text-bottom;
				`
			)}
		/>
	)
)

export const Menu = React.forwardRef(({ className, ...props }: IProps, ref) => (
	<div
		{...props}
		//@ts-ignore
		ref={ref}
		className={cx(
			className,
			css`
				& > * {
					display: inline-block;
				}

				& > * + * {
					margin-left: 15px;
				}
			`
		)}
	/>
))

interface IPortal {
	children: React.ReactNode
}

export const Portal: React.FC<IPortal> = ({ children }) => {
	return ReactDOM.createPortal(children, document.body)
}

export const Toolbar = React.forwardRef(
	({ className, ...props }: IProps, ref) => (
		<Menu
			{...props}
			ref={ref}
			className={cx(
				className,
				css`
					position: relative;
					padding: 10px;
					border-bottom: 2px solid #eee;
					margin-bottom: 20px;
				`
			)}
		/>
	)
)

interface IButton {
	format: string
	icon: string
}

export const BlockButton: React.FC<IButton> = ({ format, icon }) => {
	const editor = useSlate()
	return (
		//@ts-ignore
		<Button
			active={isBlockActive(editor, format)}
			onMouseDown={(event: Event) => {
				event.preventDefault()
				toggleBlock(editor, format)
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	)
}

export const MarkButton: React.FC<IButton> = ({ format, icon }) => {
	const editor = useSlate()
	return (
		//@ts-ignore
		<Button
			active={isMarkActive(editor, format)}
			onMouseDown={(event: Event) => {
				event.preventDefault()
				toggleMark(editor, format)
			}}
		>
			<Icon>{icon}</Icon>
		</Button>
	)
}

export const LinkButton = () => {
	const editor = useSlate()
	return (
		//@ts-ignore
		<Button
			active={isLinkActive(editor)}
			onMouseDown={(event: Event) => {
				event.preventDefault()
				const url = window.prompt('Enter the URL of the link:')
				if (!url) return
				insertLink(editor, url)
			}}
		>
			<Icon>link</Icon>
		</Button>
	)
}
