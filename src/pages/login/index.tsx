import { Text, VStack, Box } from '@chakra-ui/layout'
import { Image, Button } from '@chakra-ui/react'
import { Input } from '../../components/molecules/InputGroup'
import { NextPage } from 'next'
import { AuthTemplate } from '../../components/templates/AuthTemplate'
import { useRouter } from 'next/router'

const LoginPage: NextPage = () => {
	const router = useRouter()

	return (
		<AuthTemplate>
			<Text fontFamily='Playfair Display'>Welcome back</Text>

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

				<Button colorScheme='blue' isFullWidth>
					Login
				</Button>

				<Box w='100%' textAlign='center' pt='1rem'>
					<Text>Don&apos;t have an account?</Text>
					<Button onClick={() => router.push('/register')} isFullWidth>
						Register
					</Button>
				</Box>
			</VStack>
		</AuthTemplate>
	)
}

export default LoginPage
