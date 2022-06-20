import isUrl from 'is-url'
import { Editor, Element } from 'slate'

import { wrapLink } from './helpers'

export function withLinks(editor: Editor): Editor {
	//@ts-ignore
	const { insertData, insertText, isInline } = editor

	editor.isInline = (element: Element): boolean => {
		//@ts-ignore
		return element.type === 'link' ? true : isInline(element)
	}

	editor.insertText = (text: string): void => {
		if (text && isUrl(text)) {
			wrapLink(editor, text)
		} else {
			insertText(text)
		}
	}

	//@ts-ignore
	editor.insertData = (data: DataTransfer): void => {
		const text = data.getData('text/plain')

		if (text && isUrl(text)) {
			wrapLink(editor, text)
		} else {
			insertData(data)
		}
	}

	return editor
}
