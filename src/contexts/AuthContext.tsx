import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from '../utils/api'
import { cookieSettings } from '../constants/cookies'
import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'

interface AuthProviderProps {
	children: ReactNode
}

type AuthContextData = {
	register: (name: string, email: string, password: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => void
	isLoading: boolean
	isLogged: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const token_config = {
		maxAge: 7 * 24 * 60 * 60, // Dias x horas x minutos x segundos = ms
		path: '/',
	}

	const [isLoading, setIsLoading] = useState(true)
	const [isLogged, setIsLogged] = useState(false)

	const router = useRouter()
	const toast = useToast()

	useEffect(() => {
		loadLocalData()
	}, [])

	const loadLocalData = () => {
		const token = parseCookies()[cookieSettings.TOKEN_KEY]

		if (token) {
			setIsLogged(true)
		} else {
			setIsLogged(false)
		}
		setIsLoading(false)
	}

	const register = async (
		name: string,
		email: string,
		password: string
	): Promise<void> => {
		try {
			await api.post('/user', {
				name,
				email,
				password,
			})

			const response = await api.post('/auth/login', {
				email,
				password,
			})

			const token = response.data.access_token

			api.defaults.headers.common.Authorization = `Bearer ${token}`

			// Store the user jwt as a cookie
			setCookie(null, cookieSettings.TOKEN_KEY, token, token_config)

			toast({
				title: 'Welcome to Articles Community!',
				duration: 5000,
				isClosable: true,
				status: 'success',
			})
		} catch (err: any) {
			toast({
				title: err.response.data.message,
				duration: 5000,
				isClosable: true,
				status: 'error',
			})
		}

		router.push('/')
	}

	const login = async (email: string, password: string): Promise<void> => {
		try {
			const response = await api.post('/auth/login', {
				email,
				password,
			})

			const token = response.data.access_token

			api.defaults.headers.common.Authorization = `Bearer ${token}`

			// Store the user jwt as a cookie
			setCookie(null, cookieSettings.TOKEN_KEY, token, token_config)

			toast({
				title: 'Welcome back!',
				duration: 3000,
				status: 'success',
			})

			router.push('/')
		} catch (err: any) {
			toast({
				title: err.response.data.message,
				duration: 5000,
				isClosable: true,
				status: 'error',
			})
		}
	}

	const logout = async () => {
		destroyCookie(null, cookieSettings.TOKEN_KEY)
		router.push('/login')
	}

	return (
		<AuthContext.Provider
			value={{ register, login, logout, isLoading, isLogged }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
