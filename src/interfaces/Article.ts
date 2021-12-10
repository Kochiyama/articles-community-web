import { ArticleLike } from './ArticleLike'
import { User } from './User'

export interface Article {
	uuid: string
	title: string
	description: string
	content: string
	publication_date: Date
	author: User
	author_uuid: string
	likes: ArticleLike
	comments: Comment[]
}
