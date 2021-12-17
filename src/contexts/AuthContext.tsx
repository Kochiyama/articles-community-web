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
import { User } from '../interfaces/User'

interface AuthProviderProps {
	children: ReactNode
}

type AuthContextData = {
	register: (name: string, email: string, password: string) => Promise<void>
	login: (email: string, password: string) => Promise<void>
	logout: () => void
	user: User | undefined
	isLoading: boolean
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const token_config = {
		maxAge: 7 * 24 * 60 * 60, // Dias x horas x minutos x segundos = ms
		path: '/',
	}

	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<User>()

	const router = useRouter()
	const toast = useToast()

	useEffect(() => {
		loadLocalData()
	}, [])

	const loadLocalData = () => {
		const token = parseCookies()[cookieSettings.TOKEN_KEY]
		const user = parseCookies()[cookieSettings.USER_KEY]

		if (token && user) {
			setUser(JSON.parse(user))
		}

		setIsLoading(false)
	}

	const register = async (
		name: string,
		email: string,
		password: string
	): Promise<void> => {
		return new Promise(async resolve => {
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
			} finally {
				router.push('/')
				resolve()
			}
		})
	}

	const login = async (email: string, password: string): Promise<void> => {
		// We are returning a promise, beacuse the rest of the code will wait until
		// the promise is resolved, when the login is finished. Very important, so
		// our button knows when to stop loading 🔁
		return new Promise(async resolve => {
			try {
				const response = await api.post<{ user: User; access_token: string }>(
					'/auth/login',
					{
						email,
						password,
					}
				)

				const token = response.data.access_token
				const user = response.data.user

				// Set a default header for the authenticated requisitions
				api.defaults.headers.common.Authorization = `Bearer ${token}`

				// Store the user & jwt as cookies
				setCookie(null, cookieSettings.TOKEN_KEY, token, token_config)
				setCookie(
					null,
					cookieSettings.USER_KEY,
					JSON.stringify(user),
					token_config
				)

				setUser(user)

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
			} finally {
				resolve()
			}
		})
	}

	const logout = async () => {
		destroyCookie(null, cookieSettings.TOKEN_KEY)
		router.push('/login')
	}

	return (
		<AuthContext.Provider value={{ register, login, logout, isLoading, user }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
