import React, { useState, useMemo, useCallback } from 'react'
import { cx, css } from '@emotion/css'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'
import { BlockButton, LinkButton, MarkButton, Toolbar } from './components'
import { Element } from './toolbarElements'
import { toggleKeyboardShortcut } from './keyboardShortcuts'
import { withLinks } from './plugins'
import { Leaf } from './toolbarElements'

const SlateEditor = ({ editorTitle, ...props }: { editorTitle: String }) => {
	const editor = useMemo(
		//@ts-ignore
		() => withLinks(withHistory(withReact(createEditor()))),
		[]
	)

	const [value, setValue] = useState([
		{
			//@ts-ignore
			type: 'paragraph',
			children: [
				{ text: 'This is editable ' },
				{ text: 'rich', bold: true },
				{ text: ' text, ' },
				{ text: 'much', italic: true },
				{ text: ' better' },
				{ text: '!' },
			],
		},
		{
			type: 'paragraph',
			children: [
				{
					text: "Since it's rich text, you can do things like turn a selection of text ",
				},
				{ text: 'bold', bold: true },
				{
					text: ', or add a semantically rendered block quote in the middle of the page, like this:',
				},
			],
		},
		{
			type: 'block-quote',
			children: [{ text: 'A wise quote.' }],
		},
		{
			type: 'paragraph',
			children: [{ text: 'Try it out for yourself!' }],
		},
	] as Node[])

	const renderElement = useCallback(
		(props: any) => <Element {...props} />,
		[]
	)
	const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

	return (
		<div>
			<h4>{editorTitle}</h4>
			<Slate
				//@ts-ignore
				editor={editor}
				//@ts-ignore
				value={value}
				//@ts-ignore
				onChange={(value) => setValue(value)}
			>
				<div
					className={cx(css`
						border: 1px solid #ccc;
					`)}
				>
					<Toolbar>
						<MarkButton format="bold" icon="format_bold" />
						<MarkButton format="italic" icon="format_italic" />
						<MarkButton
							format="underline"
							icon="format_underlined"
						/>
						<MarkButton format="code" icon="code" />
						<BlockButton format="heading-one" icon="looks_one" />
						<BlockButton format="heading-two" icon="looks_two" />
						<BlockButton format="block-quote" icon="format_quote" />
						<BlockButton
							format="numbered-list"
							icon="format_list_numbered"
						/>
						<BlockButton
							format="bulleted-list"
							icon="format_list_bulleted"
						/>
						<LinkButton />
					</Toolbar>
					<Editable
						className={cx(css`
							min-height: 400px;
							padding: 0 16px;
						`)}
						onKeyDown={(event) => {
							if (event.key === '&') {
								// Prevent the ampersand character from being inserted.
								event.preventDefault()
								// Execute a command to insert text when the event occurs.
								//@ts-ignore
								editor.exec({
									type: 'insert_text',
									text: 'and',
								})
							}
							toggleKeyboardShortcut(event, editor)
						}}
						renderElement={renderElement}
						renderLeaf={renderLeaf}
					/>
				</div>
			</Slate>
		</div>
	)
}

export default SlateEditor
