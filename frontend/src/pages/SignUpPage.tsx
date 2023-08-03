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
} from "@chakra-ui/react";

import {
	EmailIcon,
	WarningIcon,
	ViewIcon,
	ViewOffIcon,
	InfoIcon,
} from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

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

export default function SignUpPage() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ValidationSchema>({
		resolver: zodResolver(validationSchema),
	});

	const onSubmit: SubmitHandler<ValidationSchema> = (data) =>
		console.log(data);

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
					<Text>Sign up and enjoy the features</Text>
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
							<Link as={RouterLink} to="/about" color="blue.500">
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
							// isLoading={isLoading}
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
