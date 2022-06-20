import { BaseText, Editor, Node, Transforms } from 'slate'

export const LIST_TYPES = ['numbered-list', 'bulleted-list']

/**
 * Checks whether a format block is active or not in the editor.
 * @param editor The current Slate editor
 * @param format The format block that is being checked
 */
export const isBlockActive = (editor: Editor, format: any) => {
	const [match] = Editor.nodes(editor, {
		//@ts-ignore
		match: (n) => n.type === format,
	})

	return !!match
}

/**
 * Toggles a format block to be on / off.
 * @param editor The current Slate editor
 * @param format The format block that is being checked
 */
export const toggleBlock = (editor: Editor, format: any) => {
	const isActive = isBlockActive(editor, format)
	const isList = LIST_TYPES.includes(format)

	Transforms.unwrapNodes(editor, {
		//@ts-ignore
		match: (n: Node) => LIST_TYPES.includes(n.type),
		split: true,
	})

	Transforms.setNodes(editor, {
		//@ts-ignore
		type: isActive ? 'paragraph' : isList ? 'list-item' : format,
	})

	if (!isActive && isList) {
		const block = { type: format, children: [] }
		Transforms.wrapNodes(editor, block)
	}
}

/**
 * Checks whether a format mark is active or not in the editor.
 * @param editor The current Slate editor
 * @param format The format mark that is being checked
 */
export const isMarkActive = (editor: Editor, format: any) => {
	const marks = Editor.marks(editor)
	//@ts-ignore
	return marks ? marks[format] === true : false
}

/**
 * Toggles a format mark to be on / off.
 * @param editor The current Slate editor
 * @param format The format mark that is being checked
 */
export const toggleMark = (editor: Editor, format: any) => {
	const isActive = isMarkActive(editor, format)

	if (isActive) {
		Editor.removeMark(editor, format)
	} else {
		Editor.addMark(editor, format, true)
	}
}

/**
 * Check whether the link button is active or not in the editor.
 * @param editor The current Slate editor
 */
export const isLinkActive = (editor: Editor) => {
	//@ts-ignore
	const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' })
	return !!link
}

/**
 * Unwraps a link node from the editor.
 * @param editor The current Slate editor
 */
export const unwrapLink = (editor: Editor) => {
	//@ts-ignore
	Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' })
}

/**
 * Wraps a link node to the editor.
 * @param editor The current Slate editor
 * @param url The url to wrap into a node
 */
export const wrapLink = (editor: Editor, url: string) => {
	if (isLinkActive(editor)) {
		unwrapLink(editor)
	}

	const { selection } = editor
	//@ts-ignore
	const isCollapsed = selection && Range.isCollapsed(selection)
	const link = {
		type: 'link',
		url,
		children: isCollapsed ? [{ text: url }] : [],
	}

	if (isCollapsed) {
		Transforms.insertNodes(editor, link)
	} else {
		Transforms.wrapNodes(editor, link, { split: true })
		Transforms.collapse(editor, { edge: 'end' })
	}
}

/**
 * This will insert a link into the Slate editor.
 * @param editor The current Slate editor
 * @param url The url to insert
 */
export const insertLink = (editor: Editor, url: string) => {
	if (editor.selection) {
		wrapLink(editor, url)
	}
}
