import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalFooter,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	InputGroup,
	Icon,
	useColorModeValue,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";

import { WarningIcon } from "@chakra-ui/icons";

import { useChangePasswordMutation } from "../features/auth/authApiSlice";

import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChangePasswordModal() {
	const [changePassword, { isLoading }] = useChangePasswordMutation();

	const changePasswordSchema = z
		.object({
			currentPassword: z.string(),
			newPassword: z
				.string()
				.min(8, {
					message: "New password must be atleast 8 characters",
				})
				.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
					message:
						"New password must contain atleast one uppercase letter, one lowercase letter and one number",
				})
				.max(72, {
					message: "New password can be 72 characters at most",
				}),
			confirmNewPassword: z.string(),
		})
		.refine((data) => data.newPassword === data.confirmNewPassword, {
			message: "Passwords don't match",
			path: ["confirmNewPassword"],
		});

	type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
	});

	const { isOpen, onOpen, onClose } = useDisclosure();

	const toast = useToast();

	const onSubmitChangePassword: SubmitHandler<
		ChangePasswordFormValues
	> = async (data) => {
		try {
			await changePassword({
				password: data.newPassword,
				currentPassword: data.currentPassword,
			}).unwrap();
			toast({
				title: "Password changed successfully",
				description: "Your password has been changed successfully.",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			onClose();
			reset();
		} catch (err: any) {
			toast({
				title: "An error occurred",
				description: err.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<Button
			onClick={onOpen}
			colorScheme="blue"
			variant="outline"
			// eslint-disable-next-line react-hooks/rules-of-hooks
			color={useColorModeValue("gray.700", "gray.200")}
		>
			Change Password
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Change Password</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmitChangePassword)}>
						<ModalBody>
							<FormControl
								isInvalid={Boolean(errors.currentPassword)}
							>
								<FormLabel htmlFor="currentPassword">
									Current Password
								</FormLabel>
								<InputGroup>
									<Input
										type="password"
										id="currentPassword"
										autoComplete="current-password"
										aria-describedby="password-helper-text"
										{...register("currentPassword")}
									/>
								</InputGroup>
								<FormErrorMessage>
									<Icon
										as={WarningIcon}
										color="red.500"
										mr={1}
									/>
									{errors.currentPassword &&
										errors.currentPassword.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={Boolean(errors.newPassword)}
							>
								<FormLabel htmlFor="newPassword">
									New Password
								</FormLabel>
								<InputGroup>
									<Input
										type="password"
										id="newPassword"
										autoComplete="new-password"
										{...register("newPassword")}
										aria-describedby="password-helper-text"
									/>
								</InputGroup>
								<FormErrorMessage>
									<Icon
										as={WarningIcon}
										color="red.500"
										mr={1}
									/>
									{errors.newPassword &&
										errors.newPassword.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={Boolean(errors.confirmNewPassword)}
							>
								<FormLabel htmlFor="confirmNewPassword">
									Confrim New Password
								</FormLabel>
								<InputGroup>
									<Input
										type="password"
										id="confirmNewPassword"
										autoComplete="new-password"
										{...register("confirmNewPassword")}
										aria-describedby="password-helper-text"
									/>
								</InputGroup>
								<FormErrorMessage>
									<Icon
										as={WarningIcon}
										color="red.500"
										mr={1}
									/>
									{errors.confirmNewPassword &&
										errors.confirmNewPassword.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button colorScheme="blue" mr={3} onClick={onClose}>
								Close
							</Button>
							<Button
								variant="ghost"
								type="submit"
								isLoading={isLoading}
								isDisabled={isSubmitting}
							>
								Change Password
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</Button>
	);
}
