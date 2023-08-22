import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	InputGroup,
	Input,
	Button,
	useToast,
} from "@chakra-ui/react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useLazyFindCoursesByNameQuery } from "../features/courses/courseApiSlice";

import { useAppDispatch } from "../app/hooks";
import { setCoursePageFilters } from "../features/courses/courseSlice";

const schema = z.object({
	name: z.string().nonempty(),
});

type FormValues = z.infer<typeof schema>;

export default function SearchCourses() {
	const toast = useToast();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const [findCoursesByName, { isLoading, isError }] =
		useLazyFindCoursesByNameQuery();

	if (isError) {
		toast({
			title: "Error",
			description: "An error occurred while searching for courses.",
			status: "error",
			duration: 5000,
			isClosable: true,
		});
	}
	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			await findCoursesByName({
				name: data.name,
				page: 1,
				pageSize: 10,
			});
			dispatch(
				setCoursePageFilters({
					type: "SEARCHED",
					page: 1,
					pageSize: 10,
				})
			);
		} catch (err) {
			toast({
				title: "Error",
				description: "An error occurred while searching for courses.",
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
					<Input
						id="name"
						placeholder="Course name"
						{...register("name")}
					/>
					<Button
						type="submit"
						ml={2}
						isLoading={isLoading}
						isDisabled={isSubmitting}
					>
						Search
					</Button>
				</InputGroup>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>
		</form>
	);
}
