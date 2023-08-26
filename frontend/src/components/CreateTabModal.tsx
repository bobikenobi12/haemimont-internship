import { useCallback } from "react";

import {
	Box,
	Tooltip,
	IconButton,
	Icon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	Button,
	useDisclosure,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	FormErrorMessage,
	Select,
	useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	useCreateTabMutation,
	TabContentTypeEnum,
} from "../features/tabs/tabsApiSlice";

import FileUpload from "./FileUpload";

const MB_BYTES = 1000000;
const ACCEPTED_MIME_TYPES = ["video/mp4", "video/ogg", "video/webm"];

const schema = z.object({
	name: z.string().min(1).max(100),
	contentType: z.enum([TabContentTypeEnum.TEXT, TabContentTypeEnum.VIDEO]),
	content: z.string().optional(),
	file: z
		.instanceof(File)
		.optional()
		.superRefine((f, ctx) => {
			if (!f) return f;
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

interface Props {
	children?: React.ReactNode;
	courseId: number;
}

type CreateTabSchema = z.infer<typeof schema>;

export default function CreateTabModal({ courseId }: Props) {
	const toast = useToast();
	const [createTab, { isLoading }] = useCreateTabMutation();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		register,
		reset,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<CreateTabSchema>({
		resolver: zodResolver(schema),
	});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		reset({
			...acceptedFiles[0],
			file: acceptedFiles[0],
		});
	}, []);

	const onSubmit: SubmitHandler<CreateTabSchema> = async (data) => {
		try {
			const formData = new FormData();
			formData.append("file", data.file ? data.file : "");
			formData.append("tabName", data.name);
			formData.append("contentType", data.contentType);
			formData.append("content", data.content ? data.content : "");
			formData.append("courseId", courseId.toString());

			await createTab(formData).unwrap();
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
			<IconButton
				aria-label="Add tab"
				colorScheme="purple"
				variant="outline"
				borderRadius={"50%"}
				icon={<AddIcon />}
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Create New Tab</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl isInvalid={!!errors.name} isRequired>
								<FormLabel>{"Tab name"}</FormLabel>
								<Input
									placeholder="Tab name"
									{...register("name")}
								/>
								<FormErrorMessage noOfLines={2}>
									{errors.name &&
										(errors?.name.message as string)}
								</FormErrorMessage>
							</FormControl>
							<FormControl
								isInvalid={!!errors.contentType}
								isRequired
							>
								<FormLabel>{"Content type"}</FormLabel>
								<Select
									placeholder="Select content type"
									{...register("contentType")}
								>
									<option value={TabContentTypeEnum.TEXT}>
										Text
									</option>
									<option value={TabContentTypeEnum.VIDEO}>
										Video
									</option>
								</Select>
								<FormErrorMessage noOfLines={2}>
									{errors.contentType &&
										(errors?.contentType.message as string)}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={!!errors.content}>
								<FormLabel>{"Content"}</FormLabel>
								<Textarea
									placeholder="Content"
									{...register("content")}
								/>
								<FormErrorMessage noOfLines={2}>
									{errors.content &&
										(errors?.content.message as string)}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={!!errors.file}>
								<FormLabel>{"File input"}</FormLabel>
								<FileUpload onDrop={onDrop} />
								{getValues("file") && (
									<Box mt={4}>
										<iframe
											src={URL.createObjectURL(
												getValues("file") as Blob
											)}
											width="100%"
											height="100%"
											title="Video preview"
											frameBorder="0"
											allowFullScreen
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
														file: undefined,
													});
												}}
											/>
										</Tooltip>
									</Box>
								)}
								<FormErrorMessage noOfLines={2}>
									{errors.file &&
										(errors?.file.message as string)}
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
									(getValues("file") === undefined &&
										getValues("content") === undefined)
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
