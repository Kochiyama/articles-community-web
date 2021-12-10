import { Text, Heading, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { NextPage } from 'next'

const LoginPage: NextPage = () => {
	return (
		<Flex p='2rem' flexDir='row' h='100vh'>
			<Flex flex='1' mr='2rem' px='4rem' flexDir='column'>
				<Text fontFamily='Playfair Display'>Welcome to</Text>

				<Image
					src='/images/logo-complete.png'
					alt='Articles Community'
					w='10rem'
				/>
			</Flex>

			<Flex flex='2'>
				<Image
					src='/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.png'
					alt='Image by Glenn Carstens Peters Unsplash'
				/>
			</Flex>
		</Flex>
	)
}

export default LoginPage
