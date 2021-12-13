import { Center, Flex, Image, useBreakpointValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode | ReactNode[]
}

export const AuthTemplate = ({ children }: Props) => {
	const isWideVersion = useBreakpointValue({
		md: true,
		base: false,
	})

	return (
		<Flex p='2rem' h='100vh'>
			<Center flex='1' px={{ base: '0rem', md: '4rem' }}>
				<Flex flexDir='column' minW='20rem'>
					{children}
				</Flex>
			</Center>

			{isWideVersion && (
				<Flex flex='2'>
					<Image
						src='/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.png'
						alt='Image by Glenn Carstens Peters Unsplash'
					/>
				</Flex>
			)}
		</Flex>
	)
}
