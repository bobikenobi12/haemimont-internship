import { Box, Button, Heading, Text } from "@chakra-ui/react";

import { useParams, Navigate } from "react-router-dom";

import { useGetQuestionsByCourseIdQuery } from "../features/quiz/quizApiSlice";

import { useAppSelector } from "../app/hooks";
import { selectRole } from "../features/auth/authSlice";
import { selectStatusEnum } from "../features/tabs/tabsSlice";
import CreateQuestionModal from "../components/CreateQuestionModal";

export default function CourseQuiz() {
	const { courseId } = useParams();

	const role = useAppSelector(selectRole);
	const courseStatus = useAppSelector(selectStatusEnum);

	if (!courseId) return <div>Course not found</div>;
	if (!role) return <div>Role not found</div>;
	if (!courseStatus) return <div>Course state not found</div>;

	if (role === "TEACHER") {
		return (
			<Box>
				<Heading>Quiz</Heading>
				<Text>Course ID: {courseId}</Text>
				<Button>Create Question</Button>
				<CreateQuestionModal courseId={parseInt(courseId)} />
			</Box>
		);
	}

	if (role === "STUDENT" && courseStatus !== "START_QUIZ") {
		return <Navigate to={`/courses/${courseId}`} />;
	}

	const {
		data: questions,
		error,
		isLoading,
	} = useGetQuestionsByCourseIdQuery({
		courseId: parseInt(courseId),
	});

	if (error) return <div>Failed to load questions</div>;
	if (isLoading) return <div>Loading...</div>;
	if (!questions) return <div>Questions not found</div>;

	return (
		<Box>
			<Heading>Quiz</Heading>
			<Text>Course ID: {courseId}</Text>
		</Box>
	);
}
