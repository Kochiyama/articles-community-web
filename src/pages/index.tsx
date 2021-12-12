import { Center, Image } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { cookieSettings } from '../constants/cookies'

const Home: NextPage = () => {
	return (
		<Center h='100vh'>
			<Image w='20rem' src='/logo.png' alt='Articles Community Logo' />
		</Center>
	)
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	const token = parseCookies(ctx)[cookieSettings.TOKEN_KEY]

	if (!token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		}
	}

	return {
		props: {},
	}
}

export default Home
