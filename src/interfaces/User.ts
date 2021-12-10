import { Article } from './Article'

export interface User {
	uuid: string
	name: string
	email: string
	birthday: Date
	bio: string
	country: string
	articles: Article[]
}
