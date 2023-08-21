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
	Spinner,
} from "@chakra-ui/react";

import { useAppSelector } from "../app/hooks";
import {
	selectToken,
	selectName,
	selectCredit,
	selectRole,
	selectPicturePath,
} from "../features/auth/authSlice";

import { usePrefetch } from "../features/auth/authApiSlice";

import { useNavigate, Outlet, Link as RouterLink } from "react-router-dom";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import SignOutDialog from "./SignOutDialog";
import ThemeToggle from "./ThemeToggle";
import CreateCourseModal from "./CreateCourseModal";
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
	const name = useAppSelector(selectName);
	const credit = useAppSelector(selectCredit);
	const role = useAppSelector(selectRole);
	const picturePath = useAppSelector(selectPicturePath);

	const prefetchUser = usePrefetch("getProfile");

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
						<ThemeToggle />
						{token && role === "TEACHER" && <CreateCourseModal />}
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
							<Menu onOpen={() => prefetchUser()}>
								<MenuButton
									as={Button}
									rounded={"full"}
									variant={"link"}
									cursor={"pointer"}
									minW={0}
								>
									{picturePath ? (
										<Avatar
											size={"sm"}
											src={
												import.meta.env.VITE_API_URL +
												picturePath
											}
										/>
									) : name ? (
										<Avatar size={"sm"} name={name} />
									) : (
										<Spinner />
									)}
								</MenuButton>
								<MenuList
									justifyContent={"center"}
									alignItems={"center"}
								>
									{role === "STUDENT" && (
										<MenuItem
											as={RouterLink}
											to="/user/credit"
										>
											{credit !== null ? (
												"Credit:" + credit
											) : (
												<Spinner />
											)}
										</MenuItem>
									)}
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
