import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Icon,
	Input,
	InputGroup,
	Textarea,
	Button,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import { InfoIcon } from "@chakra-ui/icons";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEditCourseMutation } from "../features/courses/courseApiSlice";

const schema = z.object({
	courseName: z.string().min(1).max(255),
	description: z.string().min(1).max(255),
});

type EditCourseFormInputs = z.infer<typeof schema>;

export interface EditCourseModalProps {
	courseId: number;
	courseName: string;
	description: string;
}

export default function EditCourseModal({
	courseId,
	courseName,
	description,
}: EditCourseModalProps) {
	const [editCourse, { isLoading }] = useEditCourseMutation();

	const {
		isOpen: isEditCourseModalOpen,
		onOpen: onEditCourseModalOpen,
		onClose: onEditCourseModalClose,
	} = useDisclosure();

	const toast = useToast();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isDirty },
	} = useForm<EditCourseFormInputs>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<EditCourseFormInputs> = async (data) => {
		try {
			await editCourse({
				courseId: courseId,
				courseName: data.courseName,
				description: data.description,
			}).unwrap();

			toast({
				title: "Course edited.",
				description: "Course has been edited successfully.",
				status: "success",
				isClosable: true,
			});
			onEditCourseModalClose();
		} catch (error: any) {
			toast({
				title: "Error editing course.",
				description: error.message,
				status: "error",
				isClosable: true,
			});
		}
	};
	return (
		<>
			<Button
				onClick={onEditCourseModalOpen}
				colorScheme="teal"
				variant={"outline"}
			>
				Edit Course
			</Button>
			<Modal
				isOpen={isEditCourseModalOpen}
				onClose={onEditCourseModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Edit Course</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl isInvalid={!!errors.courseName}>
								<FormLabel htmlFor="name">
									Course Name
								</FormLabel>
								<InputGroup>
									<Input
										id="name"
										placeholder="Enter Course Name"
										{...register("courseName")}
										defaultValue={courseName}
									/>
								</InputGroup>
								<FormErrorMessage>
									<Icon
										as={InfoIcon}
										color="red.500"
										mr={1}
									/>
									{errors.courseName?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={!!errors.description}>
								<FormLabel htmlFor="description">
									Course Description
								</FormLabel>
								<InputGroup>
									<Textarea
										id="description"
										placeholder="Enter Course Description"
										{...register("description")}
										defaultValue={description}
									/>
								</InputGroup>
								<FormErrorMessage>
									<Icon
										as={InfoIcon}
										color="red.500"
										mr={1}
									/>
									{errors.description?.message}
								</FormErrorMessage>
							</FormControl>
							<Button
								mt={4}
								colorScheme="teal"
								isLoading={isLoading}
								isDisabled={isSubmitting || !isDirty}
								type="submit"
							>
								Edit Course
							</Button>
							<Button
								mt={4}
								ml={4}
								colorScheme="teal"
								variant={"outline"}
								isDisabled={isSubmitting}
								onClick={() => {
									reset();
								}}
							>
								Reset
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
