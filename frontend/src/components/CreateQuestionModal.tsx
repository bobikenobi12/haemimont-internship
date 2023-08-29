import {
	Box,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Select,
	Button,
	IconButton,
	useDisclosure,
	useToast,
	Tooltip,
	Icon,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateQuestionMutation } from "../features/quiz/quizApiSlice";
import { useEffect } from "react";

const schema = z.object({
	question: z.string().min(1).max(100),
	rightAnswer: z.string().min(1).max(100),
	answers: z
		.object({ answer: z.string().min(1).max(100) })
		.array()
		.min(2)
		.max(6),
	points: z.number().min(1).max(10),
});

type FormValues = z.infer<typeof schema>;

interface Props {
	children?: React.ReactNode;
	courseId: number;
}

export default function CreateQuestionModal({ courseId }: Props) {
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [createQuestion, { isLoading }] = useCreateQuestionMutation();

	const defaultValues: FormValues = {
		question: "How are you feeling today?",
		rightAnswer: "Great!",
		answers: [{ answer: "Great!" }, { answer: "Amazing!" }],
		points: 1,
	};

	const {
		register,
		handleSubmit,
		watch,
		getValues,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useEffect(() => {
		watch("answers");
	}, [watch]);

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			await createQuestion({
				question: data.question,
				rightAnswer: data.rightAnswer,
				answers: data.answers,
				courseId: courseId,
				points: data.points,
			}).unwrap();
			toast({
				title: "Question created",
				description: "Your question has been created.",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
			onClose();
		} catch (err: any) {
			toast({
				title: "Error",
				description: err.message,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<Box>
			<Button onClick={onOpen}>Create Question</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Create a question:</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl
								isInvalid={!!errors.question}
								isRequired
							>
								<FormLabel htmlFor="question">
									Question
								</FormLabel>
								<Input
									id="question"
									placeholder="Question"
									{...register("question")}
								/>
								<FormErrorMessage>
									{errors.question?.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={!!errors.points}>
								<FormLabel htmlFor="points">Points</FormLabel>
								<NumberInput id="points" min={1} max={10}>
									<NumberInputField
										{...register("points", {
											valueAsNumber: true,
										})}
									/>
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
								<FormErrorMessage>
									{errors.points?.message}
								</FormErrorMessage>
							</FormControl>
							{getValues("answers").map((ans, idx) => {
								return (
									<Box
										key={idx}
										mt={2}
										display={"flex"}
										alignItems={"flex-end"}
										gap={4}
									>
										<FormControl
											isInvalid={!!errors.answers}
											isRequired
										>
											<FormLabel htmlFor="answers">
												Answer {idx + 1}
											</FormLabel>
											<Input
												id="answers"
												placeholder="Answer"
												defaultValue={ans.answer}
												{...register(
													`answers.${idx}.answer`
												)}
											/>
											<FormErrorMessage>
												{errors.answers?.message}
											</FormErrorMessage>
										</FormControl>
										<Tooltip
											label="Delete answer"
											aria-label="Delete answer"
											hasArrow
											placement="top"
										>
											<IconButton
												icon={<DeleteIcon />}
												aria-label="Delete answer"
												variant={"outline"}
												colorScheme="red"
												onClick={() => {
													const answers =
														getValues("answers");
													answers.splice(idx, 1);
													setValue(
														"answers",
														answers
													);
												}}
											/>
										</Tooltip>
									</Box>
								);
							})}
							<Tooltip
								label="Add answer"
								aria-label="Add answer"
								hasArrow
								placement="right"
							>
								<IconButton
									isDisabled={
										getValues("answers").length >= 6
									}
									mt={4}
									icon={<Icon as={AddIcon} />}
									aria-label="Add answer"
									variant={"outline"}
									colorScheme="blue"
									onClick={() => {
										const answers = getValues("answers");
										answers.push({ answer: "New answer" });
										setValue("answers", answers);
									}}
								/>
							</Tooltip>
							<FormControl
								mt={4}
								isInvalid={!!errors.rightAnswer}
								isRequired
							>
								<FormLabel htmlFor="rightAnswer">
									Right answer
								</FormLabel>
								<Select
									id="rightAnswer"
									{...register("rightAnswer")}
								>
									{getValues("answers").map((ans, idx) => {
										return (
											<option
												key={idx}
												value={ans.answer}
											>
												{ans.answer}
											</option>
										);
									})}
								</Select>
								<FormErrorMessage>
									{errors.rightAnswer?.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								type="submit"
								isLoading={isSubmitting || isLoading}
								colorScheme="blue"
								mr={3}
							>
								Create
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</Box>
	);
}
