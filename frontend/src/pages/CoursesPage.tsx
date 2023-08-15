import { useState } from "react";

import { Flex, Box, Button, Select } from "@chakra-ui/react";

import { useGetProfileQuery } from "../features/auth/authApiSlice";

import { useGetUncompletedCoursesQuery } from "../features/courses/courseApiSlice";
import type { Course as CourseProps } from "../features/courses/courseApiSlice";

import Course from "../components/Course";

export default function CoursesPage() {
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	useGetProfileQuery();

	const { data, error, isLoading, isFetching } =
		useGetUncompletedCoursesQuery({
			page,
			pageSize: perPage,
		});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

	if (!data) return <div>No courses</div>;

	return (
		<>
			{isFetching && <div>Updating...</div>}
			<Flex
				wrap={"wrap"}
				justify={"center"}
				align={"center"}
				overflowY={"scroll"}
				gap={4}
			>
				{data.courses.map(
					({
						courseId,
						courseName,
						description,
						credit,
						teacher,
					}: CourseProps) => (
						<Course
							key={courseId}
							courseId={courseId}
							courseName={courseName}
							description={description}
							credit={credit}
							teacher={teacher}
						/>
					)
				)}
			</Flex>

			<Flex justify={"center"} align={"center"} mt={4}>
				<Box mr={4}>
					<Select
						value={perPage}
						onChange={(e) => setPerPage(Number(e.target.value))}
					>
						<option value={10}>10</option>
						<option value={20}>20</option>
						<option value={50}>50</option>
					</Select>
				</Box>
				<Button
					onClick={() => setPage((prev) => prev - 1)}
					isDisabled={page === 1}
				>
					Prev
				</Button>
				<Button
					onClick={() => setPage((prev) => prev + 1)}
					isDisabled={page === Math.ceil(data.size / perPage)}
				>
					Next
				</Button>
			</Flex>
		</>
	);
}
