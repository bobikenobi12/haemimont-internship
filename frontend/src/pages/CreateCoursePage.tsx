import { Flex, Text } from "@chakra-ui/react";

import CreateCourseForm from "../components/CreateCourseForm";
import { useGetProfileQuery } from "../features/auth/authApiSlice";

export default function CreateCoursePage() {
	const { data, isLoading } = useGetProfileQuery();

	if (isLoading) {
		return <Text>Loading...</Text>;
	}

	if (!data) {
		return <Text>Something went wrong</Text>;
	}

	if (data.role !== "TEACHER") {
		return <Text>Only teachers can create courses</Text>;
	}

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
