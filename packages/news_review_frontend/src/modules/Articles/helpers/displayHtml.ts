import { Article } from '../../../generated/graphql'
import { htmlSerialiser } from './serializers'

export const displayHtml = (article: Article): string => {
	return article.json_body.map(htmlSerialiser).join('')
}
