import { useState } from "react";

import {
	Flex,
	Box,
	Button,
	Select,
	Text,
	Card,
	CardBody,
	Stack,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import {
	useGetCompletedCoursesQuery,
	useGetTeacherCoursesQuery,
} from "../features/courses/courseApiSlice";

export interface ProfileCourseListProps {
	skipCompleted?: boolean;
	skipEnrolled?: boolean;
	skipTeacher?: boolean;
}

export default function ProfileCourseList({
	skipCompleted,
	skipEnrolled,
	skipTeacher,
}: ProfileCourseListProps) {
	const navigate = useNavigate();

	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { data: completedCourses, isLoading: isLoadingCompletedCourses } =
		useGetCompletedCoursesQuery(
			{
				page,
				pageSize: perPage,
				completed: true,
			},
			{
				skip: skipCompleted,
			}
		);

	const { data: enrolledCourses, isLoading: isLoadingEnrolledCourses } =
		useGetCompletedCoursesQuery(
			{
				page,
				pageSize: perPage,
				completed: false,
			},
			{
				skip: skipEnrolled,
			}
		);

	const { data: teacherCourses, isLoading: isLoadingTeacherCourses } =
		useGetTeacherCoursesQuery(
			{
				page,
				pageSize: perPage,
			},
			{
				skip: skipTeacher,
			}
		);

	const fetchedData = skipTeacher
		? skipCompleted
			? enrolledCourses
			: completedCourses
		: teacherCourses;

	if (
		isLoadingCompletedCourses ||
		isLoadingEnrolledCourses ||
		isLoadingTeacherCourses
	)
		return <div>Loading...</div>;

	if (!fetchedData) return <div>No courses found</div>;

	return (
		<Card>
			<Stack>
				<CardBody>
					<Accordion defaultIndex={[0]}>
						{fetchedData.courses.map((course) => (
							<AccordionItem key={course.courseId}>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										{course.courseName}
									</Box>
									<AccordionIcon />
								</AccordionButton>
								<AccordionPanel pb={4}>
									<Text> {course.description}</Text>
									<Button
										colorScheme="blue"
										mt={4}
										onClick={() =>
											navigate(
												`/courses/${course.courseId}`
											)
										}
									>
										View Course
									</Button>
								</AccordionPanel>
							</AccordionItem>
						))}
					</Accordion>
					<Flex justify={"center"} align={"center"} mt={4}>
						<Box mr={4}>
							<Select
								value={perPage}
								onChange={(e) =>
									setPerPage(Number(e.target.value))
								}
							>
								<option value={10}>10</option>
								<option value={20}>20</option>
								<option value={50}>50</option>
							</Select>
						</Box>
						<Button
							onClick={() => setPage((prev) => prev - 1)}
							isDisabled={page === 1}
						>
							Prev
						</Button>
						<Button
							onClick={() => setPage((prev) => prev + 1)}
							isDisabled={
								page === Math.ceil(fetchedData.size / perPage)
							}
						>
							Next
						</Button>
					</Flex>
				</CardBody>
			</Stack>
		</Card>
	);
}
