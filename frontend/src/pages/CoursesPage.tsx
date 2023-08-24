import { useEffect } from "react";

import {
	Flex,
	Box,
	Button,
	Select,
	Text,
	Badge,
	HStack,
} from "@chakra-ui/react";

import { useGetProfileQuery } from "../features/auth/authApiSlice";
import {
	useGetUncompletedCoursesQuery,
	useGetAllCoursesQuery,
	useGetCompletedCoursesQuery,
	useGetTeacherCoursesQuery,
} from "../features/courses/courseApiSlice";

import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
	selectCoursePageFilters,
	selectAllCourses,
	selectUncompletedCourses,
	selectCompletedCourses,
	selectEnrolledCourses,
	selectTeacherCourses,
	selectSearchedCourses,
	setCoursePageFilters,
	CoursePageFiltersTypeEnum,
} from "../features/courses/courseSlice";

import type { Course as CourseProps } from "../features/courses/courseApiSlice";

import Course from "../components/Course";

export default function CoursesPage() {
	const dispatch = useAppDispatch();

	const coursePageFilters = useAppSelector(selectCoursePageFilters);
	const allCourses = useAppSelector(selectAllCourses);
	const completedCourses = useAppSelector(selectCompletedCourses);
	const enrolledCourses = useAppSelector(selectEnrolledCourses);
	const teacherCourses = useAppSelector(selectTeacherCourses);
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

	const {
		error: errorAll,
		isLoading: isLoadingAll,
		isFetching: isFetchingAll,
	} = useGetAllCoursesQuery(
		{
			page: coursePageFilters.page,
			pageSize: coursePageFilters.pageSize,
		},
		{
			skip: coursePageFilters.type !== "ALL",
		}
	);

	const {
		error: errorUncompleted,
		isLoading: isLoadingUncompleted,
		isFetching: isFetchingUncompleted,
	} = useGetUncompletedCoursesQuery(
		{
			page: coursePageFilters.page,
			pageSize: coursePageFilters.pageSize,
		},
		{
			skip: coursePageFilters.type !== "UNCOMPLETED",
		}
	);

	const {
		error: errorCompleted,
		isLoading: isLoadingCompleted,
		isFetching: isFetchingCompleted,
	} = useGetCompletedCoursesQuery(
		{
			page: coursePageFilters.page,
			pageSize: coursePageFilters.pageSize,
			completed: coursePageFilters.completed,
		},
		{
			skip:
				coursePageFilters.type !== "COMPLETED" ||
				coursePageFilters.type !==
					("ENROLLED" as CoursePageFiltersTypeEnum),
		}
	);

	const {
		error: errorTeacher,
		isLoading: isLoadingTeacher,
		isFetching: isFetchingTeacher,
	} = useGetTeacherCoursesQuery(
		{
			page: coursePageFilters.page,
			pageSize: coursePageFilters.pageSize,
		},
		{
			skip: coursePageFilters.type !== "TEACHER",
		}
	);

	if (
		isLoadingAll ||
		isLoadingUncompleted ||
		isLoadingCompleted ||
		isLoadingTeacher
	)
		return <div>Loading...</div>;
	if (errorAll || errorUncompleted || errorCompleted || errorTeacher)
		return <div>Something went wrong</div>;

	const data =
		coursePageFilters.type === "UNCOMPLETED"
			? uncompletedCourses
			: coursePageFilters.type === "ALL"
			? allCourses
			: coursePageFilters.type === "COMPLETED"
			? completedCourses
			: coursePageFilters.type === "ENROLLED"
			? enrolledCourses
			: searchedCourses;

	if (!data) return <div>Something went wrong</div>;

	return (
		<>
			{isFetchingAll ||
				((isFetchingUncompleted ||
					isFetchingCompleted ||
					isFetchingTeacher) && <div>Fetching...</div>)}

			<HStack justify={"center"} align={"center"} mb={4}>
				{coursePageFilters.type === "UNCOMPLETED" ? (
					<Badge colorScheme="green">Uncompleted Courses</Badge>
				) : coursePageFilters.type === "ALL" ? (
					<Badge colorScheme="purple">All Courses</Badge>
				) : coursePageFilters.type === "COMPLETED" ? (
					<Badge colorScheme="green">Completed Courses</Badge>
				) : coursePageFilters.type === "ENROLLED" ? (
					<Badge colorScheme="green">Enrolled Courses</Badge>
				) : (
					<Badge colorScheme="purple">Searched Courses</Badge>
				)}
			</HStack>
			<Box textAlign={"center"} mb={4}>
				{coursePageFilters.type === "UNCOMPLETED" ? (
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{data.size} results for uncompleted courses
					</Text>
				) : coursePageFilters.type === "ALL" ? (
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{data.size} results for all courses
					</Text>
				) : coursePageFilters.type === "COMPLETED" ? (
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{data.size} results for completed courses
					</Text>
				) : coursePageFilters.type === "ENROLLED" ? (
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{data.size} results for enrolled courses
					</Text>
				) : (
					<Text fontSize={"2xl"} fontWeight={"bold"}>
						{data.size} result for "{coursePageFilters.name}"
					</Text>
				)}
			</Box>
			<Flex wrap={"wrap"} justify={"center"} align={"center"} gap={4}>
				{data.courses.map(
					({
						courseId,
						courseName,
						description,
						credit,
						duration,
						teacher,
						picturePath,
						studentsCount,
						time_created,
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
							studentsCount={studentsCount}
							time_created={time_created}
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
