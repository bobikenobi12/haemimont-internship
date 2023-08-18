import {
	Badge,
	Button,
	Text,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Stack,
	Box,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import type { Course } from "../features/courses/courseApiSlice";

export default function Course({
	courseId,
	courseName,
	credit,
	teacher,
}: Course) {
	const navigate = useNavigate();

	return (
		<Card
			direction={{ base: "column", sm: "row" }}
			overflow="hidden"
			variant="outline"
			boxShadow="md"
			borderRadius="md"
			w={{ base: "100%", sm: "auto" }}
		>
			<Stack>
				<CardBody>
					<Heading size="md">
						{courseName} - {teacher.name}
					</Heading>

					<Badge colorScheme="blue" fontSize="sm">
						{credit} credits
					</Badge>

					<Box mt={2}>
						<Text fontSize="sm">{teacher.user.email}</Text>
					</Box>
					<CardFooter>
						<Button
							colorScheme="blue"
							size="sm"
							onClick={() => navigate(`/courses/${courseId}`)}
						>
							View Course
						</Button>
					</CardFooter>
				</CardBody>
			</Stack>
		</Card>
	);
}
