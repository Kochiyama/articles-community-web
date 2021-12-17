import {
	Button,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { BsChevronDown } from 'react-icons/bs'

export const UserMenu = () => {
	const { user, logout } = useAuth()

	if (!user) return null

	return (
		<Menu>
			<MenuButton
				_hover={{ bgColor: 'background.100', color: 'highlight' }}
				transition='ease 400ms'
				borderRadius='2rem'
			>
				<Button
					d='flex'
					pl='0rem'
					variant='ghost'
					alignItems='center'
					borderRadius='2rem'
				>
					<Image
						src='https://avatars.githubusercontent.com/u/26096036?v=4'
						alt={user.name}
						h='2.5rem'
						borderRadius='50%'
					/>

					<Text px='1rem'>{user.name}</Text>

					<BsChevronDown />
				</Button>
			</MenuButton>
			<MenuList p='0'>
				<MenuItem onClick={() => logout()}>Log out</MenuItem>
			</MenuList>
		</Menu>
	)
}
