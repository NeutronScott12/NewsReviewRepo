import { CommentComponent } from './Components/CommentComponent'

interface ICommentContainer {
	title: string
}

export const CommentContainer: React.FC<ICommentContainer> = ({ title }) => {
	return <CommentComponent title={title} />
}
