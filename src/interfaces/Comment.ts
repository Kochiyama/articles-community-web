import { CommentLike } from './CommentLike'

export interface Comment {
	uuid: string
	article_uuid: string
	user_uuid: string
	comment: string
	likes: CommentLike[]
	date: Date
}
