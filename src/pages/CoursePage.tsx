import {
	Box,
	Card,
	CardBody,
	Image,
	Text,
	Heading,
	Button,
	Flex,
	useToast,
	VStack,
	HStack,
	Avatar,
	Divider,
	useColorModeValue,
	Tooltip,
	Badge,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";

import { useNavigate, useParams } from "react-router-dom";

import { useGetCourseByIdQuery } from "../features/courses/courseApiSlice";

import { useAppSelector } from "../app/hooks";
import { selectRole, selectEmail } from "../features/auth/authSlice";

import {
	useJoinCourseMutation,
	// useCompleteCourseMutation,
} from "../features/courses/courseApiSlice";

import EditCourseModal from "../components/EditCourseModal";
import CreateTabModal from "../components/CreateTabModal";
import CreateQuestionModal from "../components/CreateQuestionModal";
import RateCoursezModal from "../components/RateCourseModal";

export default function CoursePage() {
	const [joinCourse, { isLoading: isLoadingJoinCourse }] =
		useJoinCourseMutation();
	// const [completeCourse, { isLoading: isLoadingCompleteCourse }] =
	// 	useCompleteCourseMutation();

	const navigate = useNavigate();
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
	if (isLoading || !role || !email) return <div>Loading...</div>;
	if (!course) return <div>Course not found</div>;

	return (
		<Box>
			<Flex
				direction={["column", "column", "row", "row"]}
				w="100%"
				p={4}
				pb={{ base: "0", md: "4" }}
				bg={{
					// eslint-disable-next-line react-hooks/rules-of-hooks
					base: useColorModeValue("white", "gray.800"),
					// eslint-disable-next-line react-hooks/rules-of-hooks
					md: useColorModeValue("gray.100", "gray.900"),
				}}
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

					<Box mb="4" display={"flex"} gap={4} alignItems={"center"}>
						{/* {role === "STUDENT" &&
							course.stateEnum === "START_QUIZ" && (
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
							)} */}
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
							course.stateEnum === "START_QUIZ" && (
								<Button
									colorScheme="purple"
									onClick={() => {
										navigate(
											`/courses/${course.course.courseId}/quiz`
										);
									}}
								>
									Start the quiz
								</Button>
							)}
						{role === "STUDENT" &&
							course.stateEnum === "COMPLETED" && (
								<RateCoursezModal
									courseId={course.course.courseId}
								/>
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
					<Text fontSize="lg" mb="4">
						{course.course.description}
					</Text>
					<Divider my="4" />
					<HStack>
						<Avatar
							src={
								import.meta.env.VITE_API_URL +
								course.course.teacher.user.picturePath
							}
							name={course.course.teacher.name}
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
				// eslint-disable-next-line react-hooks/rules-of-hooks
				bg={useColorModeValue("white", "gray.700")}
				boxShadow={{ base: "none", md: "lg" }}
				justifyContent={"space-between"}
				mx={"auto"}
				h={{ base: "auto", md: "auto", lg: "200px" }}
			>
				<Box
					w={["100%", "100%", "33%", "33%"]}
					p="4"
					textAlign={{ base: "left", md: "center" }}
				>
					<Flex
						alignItems="center"
						gap={2}
						justifyContent={{ base: "left", md: "center" }}
					>
						<Heading fontSize="xl" fontWeight="bold">
							{course.course.rating.toFixed(1)}
						</Heading>
						<StarIcon color="yellow.500" />
					</Flex>

					<Text>(1,234 ratings)</Text>
				</Box>
				<Divider orientation="vertical" />
				<Box
					w={["100%", "100%", "33%", "33%"]}
					p="4"
					textAlign={{ base: "left", md: "center" }}
				>
					<Heading fontSize="xl" fontWeight="bold">
						Approx. {course.course.duration.toLocaleString()} hours
					</Heading>
					<Text>{Math.floor(course.course.duration / 24)} days</Text>
				</Box>
				<Divider orientation="vertical" />
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
			<Divider display={{ base: "block", md: "none" }} h={2} my={4} />
			<Flex direction="column" w="100%" p="4">
				<Box>
					<Heading fontSize="xl" fontWeight="bold" p="4">
						What you'll learn in this course
					</Heading>
					<Text fontSize="lg" p="4">
						{course.course.description}
					</Text>
				</Box>
				<VStack
					p={4}
					spacing={4}
					flexWrap="wrap"
					borderRadius="lg"
					// eslint-disable-next-line react-hooks/rules-of-hooks
					bg={useColorModeValue("gray.100", "gray.600")}
				>
					<Flex
						w="100%"
						justifyContent="space-between"
						p="4"
						direction={["column", "column", "row", "row"]}
					>
						{course.course.tabs !== null &&
							course.course.tabs !== undefined && (
								<Flex
									direction={{ base: "column", md: "row" }}
									justifyContent="space-between"
									alignItems="center"
									w="100%"
								>
									<Heading fontSize="xl" fontWeight="bold">
										There are{" "}
										{course.course.tabs.length
											? course.course.tabs.length
											: 0}{" "}
										Tabs
									</Heading>
									{role === "STUDENT" && (
										<Text>
											{
												course.course.tabs.filter(
													(tab) => tab.completed
												).length
											}{" "}
											/ {course.course.tabs.length}{" "}
											completed
										</Text>
									)}
								</Flex>
							)}
						{role === "TEACHER" && (
							<Tooltip label="Add tab" aria-label="Add tab">
								<CreateTabModal
									courseId={course.course.courseId}
								/>
							</Tooltip>
						)}
					</Flex>
					<Divider />
					{course.course.tabs !== null &&
						course.course.tabs !== undefined &&
						course.course.tabs.length > 0 &&
						course.course.tabs.map((tab, idx) => (
							<Card
								key={tab.tab_id}
								w="100%"
								as={motion.div}
								whileHover={{
									scale: 1.05,

									transition: { duration: 0.3 },
								}}
								whileTap={{ scale: 0.95 }}
								cursor={"pointer"}
								onClick={() =>
									navigate(
										`/courses/${course.course.courseId}/${tab.tab_id}`
									)
								}
							>
								<CardBody>
									<Flex
										justifyContent="space-between"
										alignItems={"center"}
									>
										<Box>
											<Heading
												fontSize="xl"
												fontWeight="bold"
											>
												{tab.tabName}
											</Heading>
											<Text>Tab {idx + 1}</Text>
										</Box>
										{role === "STUDENT" && (
											<Badge
												ml="1"
												fontSize="0.8em"
												colorScheme={
													tab.completed
														? "green"
														: "yellow"
												}
											>
												{tab.completed
													? "Completed"
													: "Not completed"}
											</Badge>
										)}
									</Flex>
								</CardBody>
							</Card>
						))}
				</VStack>
			</Flex>
			{role === "TEACHER" && (
				<>
					<Divider
						display={{ base: "block", md: "none" }}
						h={2}
						my={4}
					/>
					<Heading fontSize="xl" fontWeight="bold" p="4">
						Quiz
					</Heading>
					<CreateQuestionModal courseId={course.course.courseId} />
				</>
			)}
		</Box>
	);
}
