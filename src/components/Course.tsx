import {
	Text,
	Stack,
	Box,
	Heading,
	Avatar,
	Center,
	Image,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import type { Course } from "../features/courses/courseApiSlice";

import { FormatDate } from "../utils/FormatDate";

export default function Course({
	courseId,
	courseName,
	credit,
	description,
	duration,
	picturePath,
	studentsCount,
	teacher,
	time_created,
}: Course) {
	const navigate = useNavigate();

	return (
		<Center py={6}>
			<Box
				maxW={"445px"}
				w={"full"}
				// eslint-disable-next-line react-hooks/rules-of-hooks
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"2xl"}
				rounded={"md"}
				p={6}
				overflow={"hidden"}
				cursor={"pointer"}
				as={motion.div}
				whileHover={{
					scale: 1.05,
					transition: { duration: 0.3 },
				}}
				whileTap={{ scale: 0.95 }}
				onClick={() => navigate(`/courses/${courseId}`)}
			>
				<Box
					h={"250px"}
					bg={"gray.100"}
					mt={-6}
					mx={-6}
					mb={6}
					pos={"relative"}
				>
					<Image
						src={import.meta.env.VITE_API_URL + picturePath}
						objectFit={"fill"}
						boxSize={"full"}
						alt={courseName}
					/>
				</Box>
				<Stack>
					<Text
						color={"green.500"}
						textTransform={"uppercase"}
						fontWeight={800}
						fontSize={"sm"}
						letterSpacing={1.1}
					>
						{studentsCount} students enrolled
					</Text>
					<Heading
						// eslint-disable-next-line react-hooks/rules-of-hooks
						color={useColorModeValue("gray.700", "white")}
						fontSize={"2xl"}
						fontFamily={"body"}
					>
						{courseName}
					</Heading>
					<Text color={"gray.500"} noOfLines={3}>
						{description}
					</Text>
				</Stack>
				<Stack mt={6} direction={"row"} spacing={4} align={"center"}>
					<Avatar
						src={
							import.meta.env.VITE_API_URL +
							teacher.user.picturePath
						}
						name={teacher.name}
					/>
					<Stack direction={"column"} spacing={0} fontSize={"sm"}>
						<Text fontWeight={600}>{teacher.name}</Text>
						<Text color={"gray.500"}>
							{FormatDate(time_created)} · {duration}h · {credit}{" "}
							credits
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Center>
	);
}
