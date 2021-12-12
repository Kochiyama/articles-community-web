import { VStack, Text, Image, Button, Box } from '@chakra-ui/react'
import { Input } from '../../components/molecules/InputGroup'
import { GetServerSideProps, NextPage } from 'next'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import { useRouter } from 'next/router'
import { cookieSettings } from '../../constants/cookies'
import { parseCookies } from 'nookies'

const RegisterPage: NextPage = () => {
	const router = useRouter()

	return (
		<AuthTemplate>
			<Text fontFamily='Playfair Display'>Welcome to</Text>

			<Image
				src='/images/logo-complete.png'
				alt='Articles Community'
				w='10rem'
			/>

			<VStack spacing='2rem' py='2rem'>
				<Input label='Email' name='email' placeholder='example@email.com' />

				<Input
					label='Password'
					name='password'
					type='password'
					placeholder='***********'
				/>

				<Input
					label='Password confirmation'
					name='passwordConfirmation'
					type='password'
					placeholder='***********'
				/>

				<Button colorScheme='blue' isFullWidth>
					Create Account
				</Button>

				<Box w='100%' textAlign='center'>
					<Text>Don&apos;t have an account?</Text>
					<Button onClick={() => router.push('login')} isFullWidth>
						login with credentials
					</Button>
				</Box>
			</VStack>
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
