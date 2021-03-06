import { Text, VStack, Box } from '@chakra-ui/layout'
import { Image, Button } from '@chakra-ui/react'
import { Input } from '../../components/molecules/InputGroup'
import { GetServerSideProps, NextPage } from 'next'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAuth } from '../../contexts/AuthContext'
import { cookieSettings } from '../../constants/cookies'
import { parseCookies } from 'nookies'
import { useState } from 'react'

const formSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
})

const LoginPage: NextPage = () => {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()

	const { login } = useAuth()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: formSchema,
		onSubmit: async values => {
			setIsLoading(true)
			await login(values.email, values.password)
			setIsLoading(false)
		},
	})

	return (
		<AuthTemplate>
			<Text fontFamily='Playfair Display'>Welcome back</Text>

			<Image
				src='/images/logo-complete.png'
				alt='Articles Community'
				w='10rem'
			/>

			<form onSubmit={formik.handleSubmit}>
				<VStack spacing='2rem' py='4rem'>
					<Input
						label='Email'
						name='email'
						type='email'
						placeholder='example@email.com'
						onChange={formik.handleChange}
						error={formik.errors.email}
					/>

					<Input
						label='Password'
						name='password'
						type='password'
						placeholder='***********'
						onChange={formik.handleChange}
						error={formik.errors.password}
					/>

					<Button
						isLoading={isLoading}
						type='submit'
						colorScheme='blue'
						isFullWidth
					>
						Login
					</Button>

					<Box w='100%' textAlign='center' pt='1rem'>
						<Text>Don&apos;t have an account?</Text>
						<Button onClick={() => router.push('/register')} isFullWidth>
							Register
						</Button>
					</Box>
				</VStack>
			</form>
		</AuthTemplate>
	)
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const token = parseCookies(ctx)[cookieSettings.TOKEN_KEY]

	if (token) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}

export default LoginPage
