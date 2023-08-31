import { useState } from "react";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	Box,
	useDisclosure,
	useToast,
	FormControl,
	FormErrorMessage,
	Textarea,
	Icon,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import { motion } from "framer-motion";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRateCourseMutation } from "../features/courses/courseApiSlice";
import { useEffect } from "react";

const schema = z.object({
	rating: z.number().int().min(1).max(5),
	comment: z.string().min(1).max(500),
});

type FormValues = z.infer<typeof schema>;

interface Props {
	courseId: number;
	children?: React.ReactNode;
}

export default function RateCoursezModal({ courseId }: Props) {
	const [prev, setPrev] = useState<number | undefined>(undefined);

	const [rateCourse, { isLoading }] = useRateCourseMutation();

	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();

	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		getValues,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			await rateCourse({
				courseId,
				rating: data.rating,
			}).unwrap();
			onClose();
			reset();
		} catch (err: any) {
			toast({
				title: "Error",
				description: err.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
	};

	useEffect(() => {
		watch("rating");
	}, [watch]);

	return (
		<>
			<Button colorScheme="purple" onClick={onOpen}>
				Rate the course
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Rate the course</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<FormControl
								isInvalid={!!errors.rating}
								{...register("rating")}
							>
								<Text>Rating</Text>
								<Box display="flex" gap={1}>
									{Array.from(Array(5).keys()).map((i) => (
										<Box
											display="inline-block"
											as={motion.div}
											whileHover={{ scale: 1.2 }}
											whileTap={{ scale: 0.8 }}
											key={i}
											onHoverStart={() => {
												setPrev(getValues("rating"));
												setValue("rating", i + 1);
											}}
											onHoverEnd={() => {
												setValue("rating", prev ?? 0);
											}}
											onClick={() => {
												setPrev(i + 1);
												setValue("rating", i + 1);
											}}
										>
											<Icon
												as={StarIcon}
												boxSize={8}
												color={
													i + 1 <= getValues("rating")
														? "purple.500"
														: "gray.300"
												}
												cursor="pointer"
												_hover={{
													color: "purple.600",
												}}
											/>
										</Box>
									))}
								</Box>
							</FormControl>
							<FormErrorMessage>
								{errors.rating && errors.rating.message}
							</FormErrorMessage>
							<FormControl isInvalid={!!errors.comment}>
								<Text>Comment</Text>
								<Textarea
									placeholder="Comment"
									{...register("comment")}
								/>
								<FormErrorMessage>
									{errors.comment && errors.comment.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>
						<ModalFooter>
							<Button
								type="submit"
								colorScheme="purple"
								mr={3}
								isLoading={isLoading || isSubmitting}
								isDisabled={isLoading || isSubmitting}
							>
								Rate
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
}
