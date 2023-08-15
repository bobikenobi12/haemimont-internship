import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Heading,
	Input,
	Textarea,
	InputGroup,
	FormLabel,
	FormErrorMessage,
	Icon,
	Button,
	FormControl,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";

import { InfoIcon } from "@chakra-ui/icons";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useCreateCourseMutation } from "../features/courses/courseApiSlice";

export default function CreateCourseModal() {
	const [createCourse, { isLoading }] = useCreateCourseMutation();

	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const schema = z.object({
		name: z
			.string()
			.min(3, {
				message: "Course name must be at least 3 characters long",
			})
			.max(50, {
				message: "Course name must be at most 50 characters long",
			}),
		description: z
			.string()
			.min(3, {
				message:
					"Course description must be at least 3 characters long",
			})
			.max(500, {
				message:
					"Course description must be at most 500 characters long",
			}),
		credit: z.coerce
			.number()
			.min(1, {
				message: "Course credit must be at least 1",
			})
			.max(500, {
				message: "Course credit must be at most 500",
			}),
		duration: z.coerce
			.number()
			.min(1, {
				message: "Course duration must be at least 1",
			})
			.max(500, {
				message: "Course duration must be at most 500",
			}),
	});

	type CreateCourse = z.infer<typeof schema>;

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreateCourse>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<CreateCourse> = async (data) => {
		try {
			await createCourse({
				courseName: data.name,
				description: data.description,
				credit: data.credit,
				duration: data.duration,
			}).unwrap();
			toast({
				title: "Course created",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			reset();
			onClose();
		} catch (err: any) {
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
		<>
			<Button onClick={onOpen}>Create Course</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Course</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Heading size="md" mb={4}>
							Create a new course
						</Heading>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormControl isInvalid={!!errors.name}>
								<FormLabel htmlFor="name">Name</FormLabel>
								<InputGroup>
									<Input
										id="name"
										placeholder="Name"
										{...register("name")}
									/>
								</InputGroup>
								<FormErrorMessage>
									<Icon
										as={InfoIcon}
										color="red.500"
										mr={1}
									/>
									{errors.name?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={!!errors.description}>
								<FormLabel htmlFor="description">
									Description
								</FormLabel>
								<InputGroup>
									<Textarea
										id="description"
										placeholder="Description"
										{...register("description")}
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
							<FormControl isInvalid={!!errors.credit}>
								<FormLabel htmlFor="credit">Credit</FormLabel>
								<Input
									id="credit"
									placeholder="Credit"
									{...register("credit")}
									type="number"
								/>
								<FormErrorMessage>
									<Icon
										as={InfoIcon}
										color="red.500"
										mr={1}
									/>
									{errors.credit?.message}
								</FormErrorMessage>
							</FormControl>

							<FormControl isInvalid={!!errors.duration}>
								<FormLabel htmlFor="duration">
									Duration
								</FormLabel>
								<Input
									id="duration"
									placeholder="Course Duration"
									{...register("duration")}
									type="number"
								/>
								<FormErrorMessage>
									<Icon
										as={InfoIcon}
										color="red.500"
										mr={1}
									/>
									{errors.duration?.message}
								</FormErrorMessage>
							</FormControl>

							<Button
								mt={4}
								colorScheme="teal"
								isLoading={isLoading}
								isDisabled={isSubmitting}
								type="submit"
							>
								Create Course
							</Button>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
