import { useState } from "react";

import {
	Flex,
	Box,
	Heading,
	Text,
	FormControl,
	FormLabel,
	FormHelperText,
	FormErrorMessage,
	InputGroup,
	Input,
	InputLeftElement,
	InputRightElement,
	Tooltip,
	Button,
	Link,
	Divider,
	Icon,
	useToast,
} from "@chakra-ui/react";

import {
	EmailIcon,
	WarningIcon,
	ViewIcon,
	ViewOffIcon,
	InfoIcon,
} from "@chakra-ui/icons";

import { useRegisterMutation } from "../features/auth/authApiSlice";
import { Role } from "../features/auth/authApiSlice";

import { Link as RouterLink, useNavigate } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const validationSchema = z
	.object({
		name: z.string().min(1, { message: "Full name is required" }),
		email: z.string().min(1, { message: "Email is required" }).email({
			message: "Must be a valid email",
		}),
		password: z
			.string()
			.min(8, { message: "Password must be atleast 8 characters" })
			.max(72, { message: "Password can be 72 characters ata most" }),
		confirmPassword: z
			.string()
			.min(8, { message: "Password must be atleast 8 characters" })
			.max(72, { message: "Password can be 72 characters ata most" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Password don't match",
	});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function SignUpPage({ role }: { role: Role }) {
	const toast = useToast();
	const navigate = useNavigate();
	const userType = role === Role.STUDENT ? "student" : "teacher";

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
		try {
			await registerUser({
				name: data.name,
				email: data.email,
				password: data.password,
				role: role,
			}).unwrap();
			toast({
				title: "Account created.",
				description: "We've created your account for you.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			navigate("/sign-in");
		} catch (err: any) {
			toast({
				title: "An error occurred.",
				description: err.data.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	const [registerUser, { isLoading }] = useRegisterMutation();

	const [showPassword, setShowPassword] = useState<Boolean>(false);

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
					<Text>Sign up and enjoy the features as a {userType}</Text>
					<Divider my={4} />
					<Text>
						Or {` `}
						<Link
							as={RouterLink}
							to={
								role === Role.STUDENT
									? "/sign-up/teacher"
									: "/sign-up/student"
							}
							color="blue.500"
						>
							{role === Role.STUDENT
								? "Sign up as an teacher"
								: "Sign up as a student"}
						</Link>
					</Text>
				</Box>
				<Box my={4} textAlign="left">
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl isInvalid={Boolean(errors.name)}>
							<FormLabel htmlFor="name">Full Name</FormLabel>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<InfoIcon color="gray.300" />}
								/>
								<Input
									id="name"
									placeholder="Enter your full name"
									{...register("name")}
								/>
							</InputGroup>
							<FormErrorMessage>
								<Icon as={WarningIcon} color="red.500" mr={1} />
								{errors.name && errors.name.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.email)}>
							<FormLabel htmlFor="email">Email</FormLabel>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<EmailIcon color="gray.300" />}
								/>
								<Input
									id="email"
									autoComplete="email"
									placeholder="name@email.com"
									{...register("email")}
								/>
							</InputGroup>
							<FormErrorMessage>
								<Icon as={WarningIcon} color="red.500" mr={1} />
								{errors.email && errors.email.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={Boolean(errors.password)}>
							<FormLabel htmlFor="password">Password</FormLabel>
							<InputGroup>
								<Input
									id="password"
									autoComplete="new-password"
									type={showPassword ? "text" : "password"}
									placeholder="Create password"
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
							<FormHelperText fontSize="sm" color="gray.500">
								Between 8 and 72 characters
							</FormHelperText>
							<FormErrorMessage>
								<Icon as={WarningIcon} color="red.500" mr={1} />
								{errors.password && errors.password.message}
							</FormErrorMessage>
						</FormControl>
						<FormControl
							isInvalid={Boolean(errors.confirmPassword)}
						>
							<FormLabel htmlFor="confirmPassword">
								Confirm Password
							</FormLabel>
							<InputGroup>
								<Input
									id="confirmPassword"
									autoComplete="new-password"
									type="password"
									placeholder="Enter your password again"
									{...register("confirmPassword")}
								/>
							</InputGroup>
							<FormErrorMessage>
								<Icon as={WarningIcon} color="red.500" mr={1} />
								{errors.confirmPassword &&
									errors.confirmPassword.message}
							</FormErrorMessage>
						</FormControl>
						<Text fontSize="sm" color="gray.500" mt={2}>
							Already have an account?{` `}
							<Link
								as={RouterLink}
								to="/sign-in"
								color="blue.500"
							>
								Sign in
							</Link>
						</Text>
						<Divider my={4} />
						<Text fontSize="sm" color="gray.500" mt={2}>
							By clicking "Sign Up", I accept the Coursera{" "}
							<Link as={RouterLink} to="/terms-of-service" isExternal color="blue.500">
								Terms of Service
							</Link>{" "}
							and
							{` `}
							<Link as={RouterLink} to="/about" color="blue.500">
								Privacy Policy
							</Link>
							.
						</Text>
						<Button
							width="full"
							mt={4}
							colorScheme="blue"
							type="submit"
							isLoading={isLoading}
							disabled={isSubmitting}
						>
							Sign Up
						</Button>
					</form>
				</Box>
			</Box>
		</Flex>
	);
}
