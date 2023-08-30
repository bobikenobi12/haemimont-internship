import { useCallback } from "react";
import {
	Avatar,
	AvatarBadge,
	Box,
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Image,
	useDisclosure,
	useToast,
	Icon,
	Tooltip,
} from "@chakra-ui/react";

import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { useSetProfilePictureMutation } from "../features/auth/authApiSlice";

import { useAppSelector } from "../app/hooks";
import { selectName, selectPicturePath } from "../features/auth/authSlice";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import FileUpload from "./FileUpload";

const MB_BYTES = 1000000;
const ACCEPTED_MIME_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const schema = z.object({
	image: z.instanceof(File).superRefine((f, ctx) => {
		// First, add an issue if the mime type is wrong.
		if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `File must be one of [${ACCEPTED_MIME_TYPES.join(
					", "
				)}] but was ${f.type}`,
			});
		}
		// Next add an issue if the file size is too large.
		if (f.size > 10 * MB_BYTES) {
			ctx.addIssue({
				code: z.ZodIssueCode.too_big,
				type: "array",
				message: `The file must not be larger than ${
					10 * MB_BYTES
				} bytes: ${f.size}`,
				maximum: 10 * MB_BYTES,
				inclusive: true,
			});
		}
		// Finally, return the file.
		return f;
	}),
});

type ProfilePictureFormInputs = z.infer<typeof schema>;

export default function ProfilePictureModal() {
	const name = useAppSelector(selectName);
	const picturePath = useAppSelector(selectPicturePath);

	const toast = useToast();
	const [setPicture, { isLoading }] = useSetProfilePictureMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		reset,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<ProfilePictureFormInputs>({
		resolver: zodResolver(schema),
	});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		reset({
			...acceptedFiles[0],
			image: acceptedFiles[0],
		});
	}, []);

	const onSubmit: SubmitHandler<ProfilePictureFormInputs> = async (data) => {
		try {
			const formData = new FormData();
			formData.append("file", data.image);
			await setPicture(formData).unwrap();
			toast({
				title: "Course created",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			reset();
			onClose?.();
		} catch (err: any) {
			console.log(err.message);
			toast({
				title: "Error",
				description: err.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};
	return (
		<Box>
			<Avatar
				size="2xl"
				name={name || ""}
				src={import.meta.env.VITE_API_URL + picturePath}
			>
				<AvatarBadge
					boxSize="1em"
					placement="top-end"
					borderColor={"transparent"}
				>
					<IconButton
						aria-label="Change avatar"
						colorScheme="blue"
						borderRadius={"50%"}
						icon={<AddIcon />}
						_hover={{
							transform: "scale(1.2)",
							transition: "transform 0.2s ease-in-out",
						}}
						onClick={onOpen}
					/>
				</AvatarBadge>
			</Avatar>
			<Modal isOpen={isOpen} onClose={onClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Change Avatar</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl isInvalid={!!errors.image} isRequired>
								<FormLabel>{"File input"}</FormLabel>
								<FileUpload onDrop={onDrop} />
								{getValues("image") && (
									<Box mt={4}>
										<Image
											position={"relative"}
											src={URL.createObjectURL(
												getValues("image")
											)}
										/>
										<Tooltip
											label={
												"Remove image to select another"
											}
											aria-label={
												"Remove image to select another"
											}
										>
											<IconButton
												aria-label="Remove image"
												colorScheme="red"
												variant="outline"
												borderRadius={"50%"}
												icon={<Icon as={DeleteIcon} />}
												position={"absolute"}
												top={"-1rem"}
												right={"-1rem"}
												onClick={() => {
													reset({
														image: undefined,
													});
												}}
											/>
										</Tooltip>
									</Box>
								)}
								<FormErrorMessage noOfLines={2}>
									{errors.image &&
										(errors?.image.message as string)}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								colorScheme="blue"
								mr={3}
								onClick={onOpen}
								isLoading={isLoading}
								isDisabled={
									isSubmitting ||
									getValues("image") === undefined
								}
								type="submit"
							>
								Save
							</Button>

							<Button variant="ghost" onClick={onClose}>
								Cancel
							</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</Box>
	);
}
