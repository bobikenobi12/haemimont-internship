import { useState } from "react";

import {
	Flex,
	Box,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Icon,
	Tooltip,
	Input,
	Heading,
	Text,
	Link,
	useToast,
	HStack,
	Divider,
} from "@chakra-ui/react";

import { EmailIcon, InfoIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useLoginMutation } from "../features/auth/authApiSlice";

const schema = z.object({
	email: z.string().min(1, { message: "Email is required" }).email({
		message: "Must be a valid email",
	}),
	password: z
		.string()
		.min(8, { message: "Password must be atleast 8 characters" })
		.max(72, { message: "Password can be 72 characters ata most" }),
});

type FormValues = z.infer<typeof schema>;

export default function SignInPage() {
	const [showPassword, setShowPassword] = useState(false);

	const [login, { isLoading: loginIsLoading }] = useLoginMutation();

	const toast = useToast();
	const navigate = useNavigate();

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: FormValues) => {
		try {
			await login(data).unwrap();
			toast({
				title: "Successfully logged in!",
				description: "You have been logged in successfully!",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/");
		} catch (error: any) {
			toast({
				title: "An error occurred.",
				description: error.data?.message || "Something went wrong.",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Flex
			width="full"
			height="100vh"
			overflow={"hidden"}
			align="center"
			justifyContent="center"
		>
			<Box
				p={8}
				maxWidth="500px"
				borderWidth={1}
				borderRadius={8}
				boxShadow="lg"
			>
				<Box textAlign="center">
					<Heading>Coursera</Heading>
					<Text>
						Sign in to your account to continue using Coursera.
					</Text>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl isInvalid={Boolean(errors.email)}>
							<FormLabel htmlFor="email">Email</FormLabel>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<EmailIcon color="gray.300" />}
								/>
								<Input
									id="email"
									placeholder="name@email.com"
									autoComplete="email"
									{...register("email")}
								/>
							</InputGroup>
							<FormErrorMessage>
								<Icon as={InfoIcon} color="red.500" mr={1} />
								{errors.email && errors.email.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.password)}>
							<FormLabel htmlFor="password">Password</FormLabel>
							<InputGroup>
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									autoComplete="current-password"
									placeholder="Enter your password"
									{...register("password")}
								/>
								<Tooltip
									label={
										showPassword
											? "Hide Password"
											: "Show Password"
									}
									aria-label="Show/Hide Password"
									placement="top"
									hasArrow
								>
									<InputRightElement h="full">
										<Button
											variant="ghost"
											onClick={() => {
												setShowPassword(
													(showPassword) =>
														!showPassword
												);
											}}
										>
											{showPassword ? (
												<ViewIcon />
											) : (
												<ViewOffIcon />
											)}
										</Button>
									</InputRightElement>
								</Tooltip>
							</InputGroup>
							<FormErrorMessage>
								<Icon as={InfoIcon} color="red.500" mr={1} />
								{errors.password && errors.password.message}
							</FormErrorMessage>
						</FormControl>
						<Link
							as={RouterLink}
							to="/forgot-password"
							color="blue.500"
							mr="auto"
							mt={2}
						>
							Forgot Password?
						</Link>
						<Divider my={3} />
						<Button
							width="full"
							colorScheme="blue"
							mt={3}
							type="submit"
							isLoading={loginIsLoading}
							disabled={isSubmitting}
						>
							Sign In
						</Button>
					</form>
					<HStack mt={2} spacing={2}>
						<Text fontSize="sm" color="gray.500" mt={2}>
							Don't have an account?{` `}
							Sign up as a {` `}
							<Link
								as={RouterLink}
								to="/sign-up/student"
								color="blue.500"
							>
								Student
							</Link>
							{` `}or{` `}
							<Link
								as={RouterLink}
								to="/sign-up/instructor"
								color="blue.500"
							>
								Instructor
							</Link>
						</Text>
					</HStack>
				</Box>
			</Box>
		</Flex>
	);
}
