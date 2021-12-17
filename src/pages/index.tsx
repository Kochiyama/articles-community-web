import { Button, Center, Image } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { parseCookies } from 'nookies'
import { AppTemplate } from '../components/templates/AppTemplate'
import { cookieSettings } from '../constants/cookies'
import { useAuth } from '../contexts/AuthContext'

const Home: NextPage = () => {
	return (
		<AppTemplate />
		// <Center h='100vh'>
		// 	<Button onClick={() => logout()}>Log out</Button>
		// 	<Image w='20rem' src='/logo.png' alt='Articles Community Logo' />
		// </Center>
	)
}

export default Home
