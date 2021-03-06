import {
	FormLabel,
	Input as ChakraInput,
	InputProps,
	InputGroup,
	Text,
} from '@chakra-ui/react'
import { forwardRef, ForwardRefRenderFunction, useEffect } from 'react'

interface Props extends InputProps {
	name: string
	label?: string
	error?: string | undefined
	password?: boolean
	touched?: boolean
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
	{ label, name, error, touched, ...rest },
	ref
) => {
	return (
		<InputGroup flexDir='column' w='100%'>
			<FormLabel w='100%' htmlFor={name}>
				{label}
			</FormLabel>

			<ChakraInput
				isInvalid={error && touched ? true : false}
				id={name}
				name={name}
				ref={ref}
				errorBorderColor='error.100'
				{...rest}
			/>

			{error && touched && (
				<Text w='100%' color='error.100' mt='0.5rem'>
					{error}
				</Text>
			)}
		</InputGroup>
	)
}

export const Input = forwardRef(InputBase)
