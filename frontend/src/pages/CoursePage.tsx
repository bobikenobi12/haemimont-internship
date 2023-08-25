import {
	Box,
	Stack,
	IconButton,
	Card,
	CardBody,
	Image,
	Text,
	Heading,
	Button,
	Center,
	Flex,
	useToast,
	Highlight,
	HStack,
	Avatar,
	Divider,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { useGetCourseByIdQuery } from "../features/courses/courseApiSlice";

import { useAppSelector } from "../app/hooks";
import { selectRole, selectEmail } from "../features/auth/authSlice";

import {
	useJoinCourseMutation,
	useCompleteCourseMutation,
} from "../features/courses/courseApiSlice";

import EditCourseModal from "../components/EditCourseModal";

export default function CoursePage() {
	const [joinCourse, { isLoading: isLoadingJoinCourse }] =
		useJoinCourseMutation();
	const [completeCourse, { isLoading: isLoadingCompleteCourse }] =
		useCompleteCourseMutation();

	const toast = useToast();
	const role = useAppSelector(selectRole);
	const email = useAppSelector(selectEmail);

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
		<Box>
			<Flex
				direction={["column", "column", "row", "row"]}
				w="100%"
				p={4}
				// justify={["center", "center", "space-between", "space-between"]}
				// align="center"
				bg={["white", "white", "gray.100", "gray.100"]}
			>
				<Box w={["100%", "100%", "50%", "50%"]} p="4">
					<Image
						src={
							import.meta.env.VITE_API_URL +
							course.course.picturePath
						}
						alt="Course Picture"
					/>
					<Heading
						fontSize={["2xl", "2xl", "4xl", "4xl"]}
						mt="4"
						mb="2"
					>
						{course.course.courseName}
					</Heading>
					<Box
						mb="4"
						display={"flex"}
						flexDirection={{ base: "column", md: "row" }}
						gap={4}
						alignItems={"center"}
					>
						{role === "STUDENT" &&
							course.stateEnum === "CAN_COMPLETE" && (
								<Button
									colorScheme="purple"
									isLoading={isLoadingCompleteCourse}
									isDisabled={isLoadingCompleteCourse}
									onClick={async () => {
										try {
											await completeCourse({
												courseId:
													course.course.courseId,
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
							)}
						{role === "STUDENT" &&
							course.stateEnum === "CAN_ENROLL" && (
								<Button
									colorScheme="purple"
									isLoading={isLoadingJoinCourse}
									isDisabled={isLoadingJoinCourse}
									onClick={async () => {
										try {
											await joinCourse({
												courseId:
													course.course.courseId,
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
							)}
						{role === "STUDENT" &&
							course.stateEnum === "COMPLETED" && (
								<Text fontSize="lg" color="green.500">
									Course completed
								</Text>
							)}
						{role === "TEACHER" &&
							course.course.teacher.user.email === email && (
								<EditCourseModal
									courseId={course.course.courseId}
									courseName={course.course.courseName}
									description={course.course.description}
								/>
							)}

						<Text fontSize="lg" color="green.500">
							{course.course.credit} credits
						</Text>
					</Box>
					<Text>
						{course.course.studentsCount.toLocaleString()} enrolled
						students
					</Text>
				</Box>

				<Box w={["100%", "100%", "50%", "50%"]} p="4">
					<Heading
						fontSize={["2xl", "2xl", "4xl", "4xl"]}
						mt="4"
						mb="2"
					>
						About the course
					</Heading>
					<Text>{course.course.description}</Text>
					<Divider my="4" />
					<HStack>
						<Avatar
							src={
								import.meta.env.VITE_API_URL +
								course.course.teacher.user.picturePath
							}
						/>
						<Text>Teacher: {course.course.teacher.name}</Text>
					</HStack>
				</Box>
			</Flex>
			<Divider display={{ base: "block", md: "none" }} h={2} />
			<Flex
				direction={["column", "column", "row", "row"]}
				w={{ base: "100%", md: "100%", lg: "80%" }}
				p={{ base: "4", md: "12" }}
				borderRadius={{ base: "0", md: "lg" }}
				bg="white"
				boxShadow={{ base: "none", md: "lg" }}
				justifyContent={"space-between"}
				mx={"auto"}
			>
				<Box
					w={["100%", "100%", "33%", "33%"]}
					p="4"
					textAlign={{ base: "left", md: "center" }}
				>
					<Heading fontSize="xl" fontWeight="bold">
						4,7 / 5
					</Heading>
					<Text>(1,234 ratings)</Text>
				</Box>
				<Divider orientation="vertical" />
				<Box
					w={["100%", "100%", "33%", "33%"]}
					p="4"
					textAlign={{ base: "left", md: "center" }}
				>
					<Heading fontSize="xl" fontWeight="bold">
						Approx. {course.course.duration} hours to complete
					</Heading>
					<Text>{Math.floor(course.course.duration / 24)} days</Text>
				</Box>
				<Divider orientation="vertical" color={"gray.500"} />
				<Box
					w={["100%", "100%", "33%", "33%"]}
					p="4"
					textAlign={{ base: "left", md: "center" }}
				>
					<Heading fontSize="xl" fontWeight="bold">
						Flexible schedule
					</Heading>
					<Text>Learn at your own pace</Text>
				</Box>
			</Flex>
			<Divider display={{ base: "block", md: "none" }} h={2} />
		</Box>
	);
}
