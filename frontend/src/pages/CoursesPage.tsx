import { useEffect } from "react";

import {
	Flex,
	Box,
	Button,
	Select,
	Text,
	Badge,
	VStack,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

import { useGetProfileQuery } from "../features/auth/authApiSlice";
import {
	useGetUncompletedCoursesQuery,
	useGetAllCoursesQuery,
	useGetCompletedCoursesQuery,
	useGetTeacherCoursesQuery,
	useFindCoursesByNameQuery,
} from "../features/courses/courseApiSlice";

import { useAppSelector, useAppDispatch } from "../app/hooks";

import { selectRole } from "../features/auth/authSlice";

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

	const role = useAppSelector(selectRole);

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
				coursePageFilters.type !== "ENROLLED"
					? coursePageFilters.type !== "COMPLETED"
					: false,
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

	const {
		error: errorSearch,
		isLoading: isLoadingSearch,
		isFetching: isFetchingSearch,
	} = useFindCoursesByNameQuery(
		{
			name: coursePageFilters.name,
			page: coursePageFilters.page,
			pageSize: coursePageFilters.pageSize,
		},
		{
			skip: coursePageFilters.type !== "SEARCH",
		}
	);

	if (
		isLoadingAll ||
		isLoadingUncompleted ||
		isLoadingCompleted ||
		isLoadingTeacher ||
		isLoadingSearch
	)
		return <div>Loading...</div>;
	if (
		errorAll ||
		errorUncompleted ||
		errorCompleted ||
		errorTeacher ||
		errorSearch
	)
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
			: coursePageFilters.type === "TEACHER"
			? teacherCourses
			: searchedCourses;

	if (!data) return <div>Something went wrong</div>;

	return (
		<>
			{isFetchingAll ||
				((isFetchingUncompleted ||
					isFetchingCompleted ||
					isFetchingTeacher ||
					isFetchingSearch) && <div>Fetching...</div>)}{" "}
			<Box>
				<Flex
					justify={"center"}
					align={"center"}
					mt={4}
					gap={4}
					direction={{ base: "column", md: "row" }}
				>
					<VStack mr={4}>
						<Text fontSize={"xl"}>
							{data.size} results{" "}
							{coursePageFilters.type === "SEARCH" &&
								`for "${coursePageFilters.name}"`}
						</Text>
						{coursePageFilters.type === "SEARCH" && (
							<Badge
								colorScheme="purple"
								alignItems={"center"}
								borderRadius={"full"}
								px={2}
								py={1}
								display={"flex"}
								gap={1}
								as={motion.div}
								whileHover={{
									scale: 1.05,
									transition: { duration: 0.3 },
								}}
							>
								<CloseIcon
									mr={1}
									cursor={"pointer"}
									onClick={() => {
										dispatch(
											setCoursePageFilters({
												...coursePageFilters,
												page: 1,
												type: "ALL",
												name: "",
											})
										);
									}}
								/>
								{coursePageFilters.name}
							</Badge>
						)}
					</VStack>

					<Select
						maxW={"200px"}
						mr={4}
						value={coursePageFilters.type}
						onChange={(e) => {
							dispatch(
								setCoursePageFilters({
									...coursePageFilters,
									page: 1,
									type: e.target
										.value as CoursePageFiltersTypeEnum,
									completed:
										e.target.value === "COMPLETED"
											? true
											: e.target.value === "ENROLLED"
											? false
											: undefined,
								})
							);
						}}
					>
						<option value={"ALL"}>All</option>
						{role === "STUDENT" && (
							<>
								<option value={"UNCOMPLETED"}>
									Uncompleted
								</option>
								<option value={"COMPLETED"}>Completed</option>
								<option value={"ENROLLED"}>Enrolled</option>
							</>
						)}
						{role === "TEACHER" && (
							<option value={"TEACHER"}>Teacher</option>
						)}
					</Select>
				</Flex>
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
								rating={0}
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
			</Box>
		</>
	);
}
