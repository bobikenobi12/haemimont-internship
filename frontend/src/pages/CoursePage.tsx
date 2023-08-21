import {
	Card,
	CardBody,
	Image,
	Text,
	Heading,
	Button,
	Center,
	Flex,
	useToast,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { useGetCourseByIdQuery } from "../features/courses/courseApiSlice";

import { useAppSelector } from "../app/hooks";
import { selectRole } from "../features/auth/authSlice";

import {
	useJoinCourseMutation,
	useCompleteCourseMutation,
} from "../features/courses/courseApiSlice";

export default function CoursePage() {
	const [joinCourse, { isLoading: isLoadingJoinCourse }] =
		useJoinCourseMutation();
	const [completeCourse, { isLoading: isLoadingCompleteCourse }] =
		useCompleteCourseMutation();

	const toast = useToast();
	const role = useAppSelector(selectRole);

	const { courseId } = useParams();

	if (!courseId) return <div>Course not found</div>;

	const {
		data: course,
		error,
		isLoading,
	} = useGetCourseByIdQuery({
		courseId: parseInt(courseId),
	});

	if (error) return <div>Failed to load course</div>;
	if (isLoading) return <div>Loading...</div>;
	if (!course) return <div>Course not found</div>;

	return (
		<>
			<Card
				direction={{ base: "column", sm: "row" }}
				overflow="hidden"
				variant="outline"
			>
				<Image
					objectFit="cover"
					maxH={250}
					maxW={250}
					src={`${import.meta.env.VITE_API_URL}${course.picturePath}`}
					alt="Course Logo"
					w={{ base: "100%", sm: "40%" }}
				/>
				<CardBody>
					<Flex
						justifyContent="center"
						gap={4}
						direction={"column"}
						h="100%"
					>
						<Heading fontSize="3xl">{course.courseName}</Heading>
						<Flex
							justifyContent="space-between"
							direction={{
								base: "column",
								md: "column",
								lg: "row",
							}}
						>
							<Text fontSize="xl">
								Duration: {course.duration}h
							</Text>
							<Text fontSize="xl">
								Instructor: {course.teacher.name}
							</Text>
							<Text fontSize="xl">Credits: {course.credit}</Text>
						</Flex>
					</Flex>
				</CardBody>
			</Card>
			<Card variant={"filled"}>
				<CardBody>
					<Text fontSize="lg">{course.description}</Text>
					<Center>
						{role === "STUDENT" ? (
							<Button
								colorScheme="purple"
								isLoading={isLoadingCompleteCourse}
								isDisabled={isLoadingCompleteCourse}
								onClick={async () => {
									try {
										await completeCourse({
											courseId: course.courseId,
										}).unwrap();
										toast({
											title: "Course completed",
											status: "success",
											duration: 5000,
											isClosable: true,
										});
									} catch (err: any) {
										toast({
											title: "Error",
											description: err.message,
											status: "error",
											duration: 5000,
											isClosable: true,
										});
									}
								}}
							>
								Complete the course
							</Button>
						) : (
							<></>
						)}
						<Button
							colorScheme="purple"
							isLoading={isLoadingJoinCourse}
							isDisabled={isLoadingJoinCourse}
							onClick={async () => {
								try {
									await joinCourse({
										courseId: course.courseId,
									}).unwrap();
									toast({
										title: "Course joined",
										status: "success",
										duration: 5000,
										isClosable: true,
									});
								} catch (err: any) {
									toast({
										title: "Error",
										description: err.message,
										status: "error",
										duration: 5000,
										isClosable: true,
									});
								}
							}}
						>
							Join the course
						</Button>
					</Center>
				</CardBody>
			</Card>
		</>
	);
}
