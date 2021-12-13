import axios from 'axios'

console.log(process.env.NODE_ENV)
let baseURL = ''

switch (process.env.NODE_ENV) {
	case 'development':
		baseURL = 'http://localhost:3030'
		break

	case 'test':
		baseURL = 'https://article-community.herokuapp.com'
		break

	case 'production':
		baseURL = 'https://article-community.herokuapp.com'
		break
}

export const api = axios.create({
	baseURL,
})
