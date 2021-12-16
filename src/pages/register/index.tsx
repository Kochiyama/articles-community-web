import { VStack, Text, Image, Button, Box, useToast } from '@chakra-ui/react'
import { Input } from '../../components/molecules/InputGroup'
import { GetServerSideProps, NextPage } from 'next'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import { useRouter } from 'next/router'
import { cookieSettings } from '../../constants/cookies'
import { parseCookies } from 'nookies'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

const formSchema = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required(),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match'),
})

const RegisterPage: NextPage = () => {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const toast = useToast()
	const { register } = useAuth()

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: formSchema,
		onSubmit: async values => {
			setIsLoading(true)
			await register(values.name, values.email, values.password)
			setIsLoading(false)
		},
	})

	return (
		<AuthTemplate>
			<Text fontFamily='Playfair Display'>Welcome to</Text>

			<Image
				src='/images/logo-complete.png'
				alt='Articles Community'
				w='10rem'
			/>

			<form onSubmit={formik.handleSubmit}>
				<VStack spacing='2rem' py='2rem'>
					<Input
						label='Name'
						name='name'
						placeholder='Your Full Name'
						onChange={formik.handleChange}
						error={formik.errors.name}
						touched={formik.touched.name}
					/>

					<Input
						label='Email'
						name='email'
						placeholder='example@email.com'
						onChange={formik.handleChange}
						error={formik.errors.email}
						touched={formik.touched.email}
					/>

					<Input
						label='Password'
						name='password'
						type='password'
						placeholder='***********'
						onChange={formik.handleChange}
						error={formik.errors.password}
						touched={formik.touched.password}
					/>

					<Button type='submit' colorScheme='blue' isFullWidth>
						Create Account
					</Button>

					<Box w='100%' textAlign='center'>
						<Text>Already have an account?</Text>
						<Button onClick={() => router.push('login')} isFullWidth>
							login with credentials
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

export default RegisterPage
