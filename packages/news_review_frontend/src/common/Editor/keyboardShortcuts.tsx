import { isHotkey } from 'is-hotkey'
import { Editor } from 'slate'
import { toggleMark } from './helpers'

export const HOTKEYS = {
	'ctrl+b': 'bold',
	'mod+b': 'bold',
	'ctrl+i': 'italic',
	'mod+i': 'italic',
	'ctrl+u': 'underline',
	'mod+u': 'underline',
	'ctrl+shift+enter': 'code',
	'mod+shift+enter': 'code',
}

export const toggleKeyboardShortcut = (event: any, editor: Editor) => {
	for (const hotkey in HOTKEYS) {
		//@ts-ignore
		if (isHotkey(hotkey, event)) {
			event.preventDefault()
			//@ts-ignore
			const mark = HOTKEYS[hotkey]
			toggleMark(editor, mark)
		}
	}
}
