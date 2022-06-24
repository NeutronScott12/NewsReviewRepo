import React, { useMemo, useCallback } from 'react'
import { cx, css } from '@emotion/css'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'
import { BlockButton, LinkButton, MarkButton, Toolbar } from './components'
import { Element } from './toolbarElements'
import { toggleKeyboardShortcut } from './keyboardShortcuts'
import { withLinks } from './plugins'
import { Leaf } from './toolbarElements'

interface ISlateEditor {
	editorTitle: string
	value: Node[]
	setValue: React.Dispatch<React.SetStateAction<Node[]>>
}

const SlateEditor: React.FC<ISlateEditor> = ({
	editorTitle,
	value,
	setValue,
	...props
}) => {
	const editor = useMemo(
		//@ts-ignore
		() => withLinks(withHistory(withReact(createEditor()))),
		[]
	)

	const renderElement = useCallback(
		(props: any) => <Element {...props} />,
		[]
	)
	const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

	// console.log(value)

	return (
		<div>
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
