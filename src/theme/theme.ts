import { ComponentStyleConfig, extendTheme } from '@chakra-ui/react'
import { Styles } from '@chakra-ui/theme-tools'

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

const styles: Styles = {
	global: {
		'*': {
			margin: 0,
			padding: 0,
			boxSizing: 'border-box',
		},
	},
}

export const theme = extendTheme({
	fonts: {
		heading: 'Playfair Display Bold',
		body: 'lato',
	},
	components: {
		Container: {
			baseStyle: {
				d: 'flex',
				maxW: 'container.xl',
			},
		},
	},
	colors,
	styles,
})
