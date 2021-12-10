import { Center, Image } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
	return (
		<Center h='100vh'>
			<Image w='20rem' src='/logo.png' alt='Articles Community Logo' />
		</Center>
	)
}

export default Home
