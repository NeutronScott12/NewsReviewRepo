import React from 'react'
// import { css, cx } from 'emotion'

interface IElement {
	attributes: any
	children: any
	element: any
}

export function Element({ attributes, children, element }: IElement) {
	switch (element.type) {
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>

		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>

		case 'heading-one':
			return <h1 {...attributes}>{children}</h1>

		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>

		case 'link':
			return (
				<a {...attributes} href={element.url}>
					{children}
				</a>
			)

		case 'list-item':
			return <li {...attributes}>{children}</li>

		case 'numbered-list':
			return <ol {...attributes}>{children}</ol>

		default:
			return <p {...attributes}>{children}</p>
	}
}

interface ILeaf {
	attributes: any
	children: any
	leaf: any
}

export function Leaf({ attributes, children, leaf }: ILeaf) {
	if (leaf.bold) {
		children = <strong>{children}</strong>
	}

	if (leaf.code) {
		children = <code>{children}</code>
	}

	if (leaf.italic) {
		children = <em>{children}</em>
	}

	if (leaf.underline) {
		children = <u>{children}</u>
	}

	return <span {...attributes}>{children}</span>
}
