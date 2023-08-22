import { useEffect } from "react";

import { Flex, Box, Button, Select, Text } from "@chakra-ui/react";

import { useGetProfileQuery } from "../features/auth/authApiSlice";
import { useGetUncompletedCoursesQuery } from "../features/courses/courseApiSlice";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	selectCoursePageFilters,
	selectUncompletedCourses,
	selectSearchedCourses,
	setCoursePageFilters,
} from "../features/courses/courseSlice";

import type { Course as CourseProps } from "../features/courses/courseApiSlice";

import Course from "../components/Course";

export default function CoursesPage() {
	const dispatch = useAppDispatch();

	const coursePageFilters = useAppSelector(selectCoursePageFilters);
	const uncompletedCourses = useAppSelector(selectUncompletedCourses);
	const searchedCourses = useAppSelector(selectSearchedCourses);

	useEffect(() => {
		dispatch(
			setCoursePageFilters({
				...coursePageFilters,
			})
		);
	}, [coursePageFilters.pageSize, dispatch, coursePageFilters.page]);

	useGetProfileQuery();

	console.log(coursePageFilters.page);
	const { error, isLoading, isFetching } = useGetUncompletedCoursesQuery(
		{
			page: coursePageFilters.page,
			pageSize: coursePageFilters.pageSize,
		},
		{
			skip: coursePageFilters.type !== "UNCOMPLETED",
		}
	);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

	const data =
		coursePageFilters.type === "UNCOMPLETED"
			? uncompletedCourses
			: searchedCourses;

	if (!data) return <div>Something went wrong</div>;

	return (
		<>
			{isFetching && <div>Updating...</div>}
			<Box textAlign={"center"} mb={4}>
				<Text fontSize={"2xl"}>Results: {data.size}</Text>
			</Box>
			<Flex
				wrap={"wrap"}
				justify={"center"}
				align={"center"}
				overflowY={"scroll"}
				gap={4}
			>
				{data.courses.map(
					({
						courseId,
						courseName,
						description,
						credit,
						duration,
						teacher,
						picturePath,
						studentCount,
					}: CourseProps) => (
						<Course
							key={courseId}
							courseId={courseId}
							courseName={courseName}
							description={description}
							credit={credit}
							duration={duration}
							teacher={teacher}
							picturePath={picturePath}
							studentCount={studentCount}
						/>
					)
				)}
			</Flex>

			<Flex justify={"center"} align={"center"} mt={4}>
				<Box mr={4}>
					<Select
						value={coursePageFilters.pageSize}
						onChange={(e) => {
							dispatch(
								setCoursePageFilters({
									...coursePageFilters,
									page: 1,
									pageSize: Number(e.target.value),
								})
							);
						}}
					>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
					</Select>
				</Box>
				<Button
					onClick={() =>
						dispatch(
							setCoursePageFilters({
								...coursePageFilters,
								page: coursePageFilters.page - 1,
							})
						)
					}
					isDisabled={coursePageFilters.page === 1}
				>
					Prev
				</Button>
				<Button
					onClick={() => {
						dispatch(
							setCoursePageFilters({
								...coursePageFilters,
								page: coursePageFilters.page + 1,
							})
						);
					}}
					isDisabled={
						coursePageFilters.page ===
						Math.ceil(data.size / coursePageFilters.pageSize)
					}
				>
					Next
				</Button>
			</Flex>
		</>
	);
}
