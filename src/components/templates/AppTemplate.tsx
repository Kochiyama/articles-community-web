import {
	Button,
	Center,
	Container,
	Flex,
	HStack,
	Image,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { UserMenu } from '../organisms/UserMenu'
import { NavigationBar } from '../organisms/NavigationBar'

interface Props {}

// TODO: add natural drop shadow

export const AppTemplate = ({}: Props) => {
	const { logout, user } = useAuth()

	useEffect(() => {
		console.log(user)
	}, [user])

	return (
		<Center flexDir='column' justifyContent='flex-start' minH='100vh'>
			<Flex bgColor='white' w='100%'>
				<Container
					as='header'
					maxW='1080px'
					maxH='4rem'
					py='0.5rem'
					px='1rem'
					justifyContent='space-between'
				>
					<Center>
						<Image h='1.5rem' src='/images/logo.png' alt='Articles Community' />
					</Center>

					<HStack spacing='4rem' h='100%'>
						<NavigationBar />

						{user ? <UserMenu /> : <Button>Sign in</Button>}
					</HStack>
				</Container>
			</Flex>
		</Center>
	)
}
