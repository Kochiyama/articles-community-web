import { extendTheme } from '@chakra-ui/react'

const colors = {
	foreground: {
		100: '#161616',
		200: '#444444',
	},
	background: {
		100: '#EDEDED',
		200: '#C7C7C7',
	},
	brand: {
		100: '#2AAB87',
	},
	error: {
		100: '#C54141',
	},
}

const styles = {
	global: {
		'*': {
			margin: 0,
			padding: 0,
			boxSizing: 'border-box',
		},
	},
}

export const theme = extendTheme({ colors, styles })
