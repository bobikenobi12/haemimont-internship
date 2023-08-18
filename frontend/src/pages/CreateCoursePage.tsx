import { Flex, Text } from "@chakra-ui/react";

import CreateCourseForm from "../components/CreateCourseForm";
import { useGetProfileQuery } from "../features/auth/authApiSlice";

export default function CreateCoursePage() {
	useGetProfileQuery();
	return (
		<>
			<Flex direction="column" align="center" justify="center" w={"100%"}>
				<Text textAlign="center" fontSize="3xl" pb="35px">
					Let's create a course
				</Text>
				<CreateCourseForm />
			</Flex>
		</>
	);
}
