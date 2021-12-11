import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { setCookie, parseCookies } from 'nookies'
import { api } from '../utils/api'

interface AuthProviderProps {
	children: ReactNode
}

type AuthContextData = {
	login: (email: string, password: string) => Promise<string | undefined>
	isLoading: boolean
	isLogged: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const TOKEN_KEY = '@articles_community_usr_token'

	const [isLoading, setIsLoading] = useState(true)
	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		loadLocalData()
	}, [])

	const loadLocalData = () => {
		const token = parseCookies()[TOKEN_KEY]

		if (token) {
			setIsLogged(true)
		} else {
			setIsLogged(false)
		}
		setIsLoading(false)
	}

	const login = async (
		email: string,
		password: string
	): Promise<string | undefined> => {
		const token_config = {
			maxAge: 7 * 24 * 60 * 60, // Dias x horas x minutos x segundos = ms
			path: '/',
		}

		try {
			const response = await api.post('/auth/login', {
				email,
				password,
			})

			const token = response.data.access_token

			api.defaults.headers.common.Authorization = `Bearer ${token}`

			// Armazenar o token em um cookie
			setCookie(null, TOKEN_KEY, token, token_config)
		} catch (err: any) {
			return err.response.data.message
		}
		return
	}

	return (
		<AuthContext.Provider value={{ login, isLoading, isLogged }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
