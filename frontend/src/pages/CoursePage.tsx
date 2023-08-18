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

import { selectCourse } from "../features/courses/courseSlice";
import { useAppSelector } from "../app/hooks";

import { useJoinCourseMutation } from "../features/courses/courseApiSlice";

export default function CoursePage() {
	const [joinCourse, { isLoading }] = useJoinCourseMutation();
	const toast = useToast();

	const { courseId } = useParams();

	if (!courseId) return <div>Course not found</div>;

	const course = useAppSelector((state) =>
		selectCourse(state, parseInt(courseId ?? ""))
	);

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
					src={course.picturePath}
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
							<Text fontSize="xl">{course.duration}</Text>
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
						<Button
							colorScheme="purple"
							isLoading={isLoading}
							isDisabled={isLoading}
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
