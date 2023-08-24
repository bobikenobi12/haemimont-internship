import {
	FormControl,
	InputLeftElement,
	InputGroup,
	Input,
	Button,
	useToast,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useLazyFindCoursesByNameQuery } from "../features/courses/courseApiSlice";

import { useAppDispatch } from "../app/hooks";
import { setCoursePageFilters } from "../features/courses/courseSlice";

const schema = z.object({
	name: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function SearchCourses() {
	const toast = useToast();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const location = useLocation();

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
					name: data.name,
				})
			);

			if (location.pathname !== "/courses") {
				navigate("/courses");
			}
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
				<InputGroup>
					<InputLeftElement
						children={<Search2Icon color="gray.600" />}
					/>
					<Input
						id="name"
						placeholder="Course name"
						{...register("name")}
						// onChange={(e) => {
						// 	if (e.target.value === "") {
						// 		console.log(e.target.value);

						// 		dispatch(
						// 			setCoursePageFilters({
						// 				type: "UNCOMPLETED",
						// 				page: 1,
						// 				pageSize: 10,
						// 			})
						// 		);
						// 		if (location.pathname !== "/courses") {
						// 			navigate("/courses");
						// 		}
						// 	}
						// }}
					/>
					<Button
						type="submit"
						ml={2}
						isLoading={isLoading}
						isDisabled={isSubmitting}
						display={{ base: "none", md: "block" }}
					>
						Search
					</Button>
				</InputGroup>
			</FormControl>
		</form>
	);
}
