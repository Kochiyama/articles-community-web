import {
	FormLabel,
	Input as ChakraInput,
	InputProps,
	InputGroup,
} from '@chakra-ui/react'

interface Props extends InputProps {
	label?: string
}

export const Input = ({ label, name, ...rest }: Props) => {
	return (
		<InputGroup flexDir='column' w='100%'>
			<FormLabel w='100%' htmlFor={name}>
				{label}
			</FormLabel>

			<ChakraInput name={name} {...rest} />
		</InputGroup>
	)
}
