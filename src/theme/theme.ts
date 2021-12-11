import { extendTheme } from '@chakra-ui/react'

import { colors } from './colors'
import { styles } from './styles'
import { fonts } from './fonts'
import { components } from './components'

export const theme = extendTheme({
	fonts,
	components,
	colors,
	styles,
})
