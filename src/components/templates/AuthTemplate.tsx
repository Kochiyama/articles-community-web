import { Center, Container, Flex, Image } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode | ReactNode[]
}

export const AuthTemplate = ({ children }: Props) => (
	<Flex p='2rem' h='100vh'>
		<Center flex='1' mr='2rem' px='4rem'>
			<Flex flexDir='column' minW='20rem'>
				{children}
			</Flex>
		</Center>

		<Flex flex='2'>
			<Image
				src='/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.png'
				alt='Image by Glenn Carstens Peters Unsplash'
			/>
		</Flex>
	</Flex>
)
