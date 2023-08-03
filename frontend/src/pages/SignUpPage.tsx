import { useState } from "react";

import {
	Flex,
	Box,
	Heading,
	Text,
	FormControl,
	FormLabel,
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
} from "@chakra-ui/icons";

import { Link as RouterLink } from "react-router-dom";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

const validationSchema = z
	.object({
		firstName: z.string().min(1, { message: "First name is required" }),
		lastName: z.string().min(1, { message: "Last name is required" }),
		email: z.string().min(1, { message: "Email is required" }).email({
			message: "Must be a valid email",
		}),
		password: z
			.string()
			.min(8, { message: "Password must be atleast 8 characters" }),
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm Password is required" }),
		terms: z.literal(true, {
			errorMap: () => ({
				message: "You must accept Terms and Conditions",
			}),
		}),
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
						<FormControl isInvalid={Boolean(errors.email)}>
							<FormLabel htmlFor="email">Email</FormLabel>
							<InputGroup>
								<InputLeftElement
									pointerEvents="none"
									children={<EmailIcon color="gray.300" />}
								/>
								<Input
									id="email"
									placeholder="Enter email"
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
									placeholder="Enter password"
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
							By clicking “Continue”, I accept the Coursera{" "}
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
