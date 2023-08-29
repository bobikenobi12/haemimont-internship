import { useEffect, useState } from "react";

import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	Radio,
	RadioGroup,
	Stack,
	FormControl,
	useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useParams, Navigate, useNavigate } from "react-router-dom";

import {
	useGetQuestionsByCourseIdQuery,
	useCompleteQuizMutation,
} from "../features/quiz/quizApiSlice";

import { useAppSelector } from "../app/hooks";
import { selectRole } from "../features/auth/authSlice";
import { selectStatusEnum } from "../features/tabs/tabsSlice";
import CreateQuestionModal from "../components/CreateQuestionModal";

const schema = z.object({
	questions: z.array(
		z.object({
			questionId: z.number(),
			rightAnswer: z.string(),
		})
	),
});

type FormValues = z.infer<typeof schema>;

export default function CourseQuiz() {
	const [questionIdx, setQuestionIdx] = useState(0);

	const [completeQuiz, { isLoading: isLoadingCompleteQuiz }] =
		useCompleteQuizMutation();

	const { courseId } = useParams();

	const navigate = useNavigate();
	const toast = useToast();
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

	const defaultValues: FormValues = {
		questions: [],
	};

	const {
		register,
		handleSubmit,
		getValues,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useEffect(() => {
		watch("questions");
	}, [watch, questionIdx]);

	const {
		data: questions,
		error,
		isLoading,
	} = useGetQuestionsByCourseIdQuery({
		courseId: parseInt(courseId),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			await completeQuiz({
				answers: data.questions,
				courseId: parseInt(courseId),
			}).unwrap();
			toast({
				title: "Quiz completed",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate(`/courses/${courseId}`);
		} catch (err: any) {
			toast({
				title: "Error",
				description: err.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	if (error) return <div>Failed to load questions</div>;
	if (isLoading || isLoadingCompleteQuiz) return <div>Loading...</div>;
	if (!questions) return <div>Questions not found</div>;

	const question = questions[questionIdx];
	return (
		<Flex direction="column" align="center" mx="auto" w="100%">
			<Heading>Quiz</Heading>
			<Text>Course ID: {courseId}</Text>
			<Box>
				<Text>{question.question}</Text>
				<Flex wrap={"wrap"}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<FormControl
							isInvalid={!!errors.questions}
							{...register("questions")}
						>
							<RadioGroup
								onChange={(value) => {
									let zodQuestions = getValues("questions");
									zodQuestions = zodQuestions.filter(
										(q) =>
											q.questionId !==
											question.question_id
									);

									zodQuestions.push({
										questionId: question.question_id,
										rightAnswer: value,
									});
									console.log(zodQuestions);
									setValue("questions", zodQuestions);
								}}
								value={
									getValues("questions").find(
										(q) =>
											q.questionId ===
											question.question_id
									)?.rightAnswer
								}
							>
								<Stack direction="column">
									{question.answers.map((answer, idx) => (
										<Radio
											key={question.question_id + idx}
											value={answer.answer}
											isDisabled={
												courseStatus !== "START_QUIZ"
											}
										>
											{answer.answer}
										</Radio>
									))}
								</Stack>
							</RadioGroup>
							{getValues("questions") &&
								getValues("questions").length ===
									questions.length && (
									<Button
										type="submit"
										isDisabled={
											courseStatus !== "START_QUIZ"
										}
									>
										Submit
									</Button>
								)}
						</FormControl>
					</form>
				</Flex>
			</Box>
			<Flex justify="center">
				<Button
					isDisabled={questionIdx === 0}
					onClick={() => {
						setQuestionIdx(questionIdx - 1);
					}}
					as={motion.button}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					Previous
				</Button>
				<Button
					isDisabled={questionIdx === questions.length - 1}
					onClick={() => {
						setQuestionIdx(questionIdx + 1);
					}}
					as={motion.button}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					Next
				</Button>
			</Flex>
		</Flex>
	);
}
