"use client";

import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
} from "@chakra-ui/react";

import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/auth/authSlice";

import { useNavigate, Outlet, Link as RouterLink } from "react-router-dom";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import SignOutDialog from "./SignOutDialog";
import ThemeToggle from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
interface Props {
	children: React.ReactNode;
	href: string;
}

const Links = [
	{
		name: "Courses",
		href: "/courses",
	},
	{
		name: "Student",
		href: "/student",
	},
	{
		name: "Instructor",
		href: "/instructor",
	},
];

const NavLink = ({ children, href }: Props) => {
	const navigate = useNavigate();

	return (
		<Box
			as="a"
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: useColorModeValue("gray.200", "gray.700"),
			}}
			cursor={"pointer"}
			onClick={() => {
				navigate(href);
			}}
		>
			{children}
		</Box>
	);
};

export default function NavBar() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const token = useAppSelector(selectToken);

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>Logo</Box>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							{Links.map(({ name, href }) => (
								<NavLink key={name} href={href}>
									{name}
								</NavLink>
							))}
						</HStack>
					</HStack>
					<Flex
						alignItems={"center"}
						justifyContent={"center"}
						gap={4}
					>
						<SearchBar />
						<ThemeToggle />
						{!token && (
							<>
								<Link
									as={RouterLink}
									to="/user/sign-in"
									display={{ base: "none", md: "block" }}
								>
									<Button
										as={Button}
										size="md"
										variant="ghost"
										colorScheme="purple"
									>
										Sign In
									</Button>
								</Link>
								<Link
									as={RouterLink}
									to="/user/sign-up/student"
								>
									<Button
										as={Button}
										variant="outline"
										colorScheme="purple"
									>
										Sign Up
									</Button>
								</Link>
							</>
						)}
						{token && (
							<Flex alignItems={"center"}>
								<Menu>
									<MenuButton
										as={Button}
										rounded={"full"}
										variant={"link"}
										cursor={"pointer"}
										minW={0}
									>
										<Avatar
											size={"sm"}
											src={
												"https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
											}
										/>
									</MenuButton>
									<MenuList
										justifyContent={"center"}
										alignItems={"center"}
									>
										<MenuItem>Credits: 142</MenuItem>
										<MenuItem
											as={RouterLink}
											to="/user/profile"
										>
											Profile
										</MenuItem>

										<MenuDivider />
										<SignOutDialog />
									</MenuList>
								</Menu>
							</Flex>
						)}
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map(({ name, href }) => (
								<NavLink key={name} href={href}>
									{name}
								</NavLink>
							))}
						</Stack>
					</Box>
				) : null}
			</Box>

			<Outlet />
		</>
	);
}
