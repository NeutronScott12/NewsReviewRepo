import { CommentComponent } from './components/CommentComponent'

interface ICommentContainer {
	title: string
}

export const CommentContainer: React.FC<ICommentContainer> = ({ title }) => {
	return <CommentComponent title={title} />
}
