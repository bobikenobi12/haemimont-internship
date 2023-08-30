import { useCallback } from "react";

import {
	Box,
	Image,
	Button,
	Input,
	Textarea,
	InputGroup,
	FormLabel,
	FormErrorMessage,
	Icon,
	FormControl,
	useToast,
} from "@chakra-ui/react";

import { InfoIcon } from "@chakra-ui/icons";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import {
	useCreateCourseMutation,
	useSetPictureMutation,
} from "../features/courses/courseApiSlice";

import FileUpload from "./FileUpload";

const MB_BYTES = 1000000;
const ACCEPTED_MIME_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

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
			message: "Course description must be at least 3 characters long",
		})
		.max(500, {
			message: "Course description must be at most 500 characters long",
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

export default function CreateCourseForm({
	onClose,
}: {
	onClose?: () => void;
}) {
	const [createCourse, { isLoading }] = useCreateCourseMutation();
	const [setPicture] = useSetPictureMutation();

	const toast = useToast();

	type CreateCourse = z.infer<typeof schema>;

	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<CreateCourse>({
		resolver: zodResolver(schema),
	});

	const onDrop = useCallback((acceptedFiles: File[]) => {
		reset({
			...acceptedFiles[0],
			image: acceptedFiles[0],
		});
	}, []);

	const onSubmit: SubmitHandler<CreateCourse> = async (data) => {
		try {
			const { courseId } = (await createCourse({
				courseName: data.name,
				description: data.description,
				credit: data.credit,
				duration: data.duration,
			}).unwrap()) as any;
			let formdata = new FormData();
			formdata.append("file", data.image);
			await setPicture({ courseId, formdata }).unwrap();
			toast({
				title: "Course created",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			reset();
			onClose?.();
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
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!errors.name}>
				<FormLabel htmlFor="name">Name</FormLabel>
				<InputGroup>
					<Input id="name" placeholder="Name" {...register("name")} />
				</InputGroup>
				<FormErrorMessage>
					<Icon as={InfoIcon} color="red.500" mr={1} />
					{errors.name?.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.description}>
				<FormLabel htmlFor="description">Description</FormLabel>
				<InputGroup>
					<Textarea
						id="description"
						placeholder="Description"
						{...register("description")}
					/>
				</InputGroup>
				<FormErrorMessage>
					<Icon as={InfoIcon} color="red.500" mr={1} />
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
					<Icon as={InfoIcon} color="red.500" mr={1} />
					{errors.credit?.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.duration}>
				<FormLabel htmlFor="duration">Duration</FormLabel>
				<Input
					id="duration"
					placeholder="Course Duration"
					{...register("duration")}
					type="number"
				/>
				<FormErrorMessage>
					<Icon as={InfoIcon} color="red.500" mr={1} />
					{errors.duration?.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={!!errors.image} isRequired>
				<FormLabel>{"File input"}</FormLabel>
				<FileUpload onDrop={onDrop} />
				{getValues("image") && (
					<Box mt={4}>
						<Image src={URL.createObjectURL(getValues("image"))} />
					</Box>
				)}
				<FormErrorMessage noOfLines={2}>
					{errors.image && (errors?.image.message as string)}
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
	);
}
