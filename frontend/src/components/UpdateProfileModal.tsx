import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	Input,
	Button,
	Heading,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	useChangeEmailMutation,
	useUpdateNameMutation,
} from "../features/auth/authApiSlice";

import { useAppDispatch } from "../app/hooks";
import { logOut } from "../features/auth/authSlice";

export default function UpdateProfileModal() {
	const [updateName, { isLoading: isUpdatingName }] = useUpdateNameMutation();
	const [changeEmail, { isLoading: isChangingEmail }] =
		useChangeEmailMutation();

	const dispatch = useAppDispatch();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const updateNameSchema = z
		.object({
			name: z.string().min(3, {
				message: "Name must be atleast 3 characters",
			}),
		})
		.refine((data) => data.name.trim().length > 0, {
			message: "Name cannot be empty",
			path: ["name"],
		});

	const changeEmailSchema = z
		.object({
			email: z.string().email({
				message: "Invalid email",
			}),
		})
		.refine((data) => data.email.trim().length > 0, {
			message: "Email cannot be empty",
			path: ["email"],
		});

	type UpdateNameFormValues = z.infer<typeof updateNameSchema>;
	type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;

	const {
		register,
		handleSubmit: handleUpdateNameSubmit,
		formState: { errors: updateNameErrors },
	} = useForm<UpdateNameFormValues>({
		resolver: zodResolver(updateNameSchema),
	});

	const {
		register: register2,
		handleSubmit: handleChangeEmailSubmit,
		formState: { errors: changeEmailErrors },
	} = useForm<ChangeEmailFormValues>({
		resolver: zodResolver(changeEmailSchema),
	});

	const handleUpdateName = async (data: UpdateNameFormValues) => {
		try {
			await updateName({
				name: data.name,
			}).unwrap();
			toast({
				title: "Name updated",
				description: "Your name has been updated successfully",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
		} catch (err: any) {
			toast({
				title: "Error",
				description: err.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const handleChangeEmail = async (data: ChangeEmailFormValues) => {
		try {
			await changeEmail({
				email: data.email,
			}).unwrap();
			toast({
				title: "Email changed",
				description: "Your email has been changed successfully",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			dispatch(logOut());
		} catch {
			toast({
				title: "Error",
				description: "Something went wrong",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Button onClick={onOpen}>Update Profile</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Profile</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Heading size="md" mb={4}>
							Update Name
						</Heading>
						<form
							onSubmit={handleUpdateNameSubmit(handleUpdateName)}
						>
							<FormControl isInvalid={!!updateNameErrors.name}>
								<FormLabel htmlFor="name">Name</FormLabel>
								<InputGroup>
									<Input
										id="name"
										placeholder="Name"
										{...register("name")}
									/>
								</InputGroup>
								<FormErrorMessage>
									{updateNameErrors.name?.message}
								</FormErrorMessage>
							</FormControl>
							<Button
								mt={4}
								colorScheme="teal"
								isLoading={isUpdatingName}
								type="submit"
							>
								Update Name
							</Button>
						</form>
						<Heading size="md" mb={4} mt={8}>
							Change Email
						</Heading>
						<form
							onSubmit={handleChangeEmailSubmit(
								handleChangeEmail
							)}
						>
							<FormControl isInvalid={!!changeEmailErrors.email}>
								<FormLabel htmlFor="email">Email</FormLabel>
								<InputGroup>
									<Input
										id="email"
										placeholder="Email"
										{...register2("email")}
									/>
								</InputGroup>
								<FormErrorMessage>
									{changeEmailErrors.email?.message}
								</FormErrorMessage>
							</FormControl>
							<Button
								mt={4}
								colorScheme="teal"
								isLoading={isChangingEmail}
								type="submit"
							>
								Change Email
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
