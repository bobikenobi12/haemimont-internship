import { useEffect } from "react";

import {
	FormControl,
	InputLeftElement,
	InputGroup,
	Input,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import { useNavigate, useLocation } from "react-router-dom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
	setCoursePageFilters,
	selectCoursePageFilters,
} from "../features/courses/courseSlice";

const schema = z.object({
	name: z.string(),
});

type FormValues = z.infer<typeof schema>;

export default function SearchCourses() {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const location = useLocation();

	const courseFilters = useAppSelector(selectCoursePageFilters);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	useEffect(() => {
		if (courseFilters.name === "") {
			dispatch(
				setCoursePageFilters({
					type: "ALL",
					page: 1,
					pageSize: 10,
					name: "",
				})
			);
			reset();
		}
	}, [dispatch, courseFilters.name, reset]);

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		dispatch(
			setCoursePageFilters({
				type: "SEARCH",
				page: 1,
				pageSize: 10,
				name: data.name,
			})
		);
		if (location.pathname !== "/courses") {
			navigate("/courses");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={!!errors.name}>
				<Controller
					name="name"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<InputGroup>
							<InputLeftElement
								children={<Search2Icon color="gray.600" />}
							/>

							<Input
								{...field}
								type="text"
								placeholder="Search courses"
							/>
						</InputGroup>
					)}
				/>
			</FormControl>
		</form>
	);
}
