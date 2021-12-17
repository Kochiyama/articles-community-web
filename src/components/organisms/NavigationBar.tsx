import { HStack, Link } from '@chakra-ui/react'
import { navigationLinks } from '../../constants/navigationBar'

export const NavigationBar = () => {
	return (
		<HStack h='100%'>
			{navigationLinks.map(link => (
				<Link
					key={link.title}
					href={link.href}
					h='100%'
					d='flex'
					alignItems='center'
					justifyContent='center'
					px='1rem'
					borderRadius='0.5rem'
					_hover={{ bgColor: 'background.100', color: 'highlight' }}
					transition='ease 200ms'
				>
					{link.title}
				</Link>
			))}
		</HStack>
	)
}
