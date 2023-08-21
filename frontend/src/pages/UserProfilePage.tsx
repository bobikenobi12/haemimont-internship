import { useEffect, useState } from "react";

import {
	Flex,
	Text,
	Heading,
	Card,
	CardBody,
	Badge,
	Box,
	Stack,
	StackDivider,
	Spinner,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
} from "@chakra-ui/react";

import UpdateProfileModal from "../components/UpdateProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import SignOutDialog from "../components/SignOutDialog";

import {
	selectRole,
	selectName,
	selectEmail,
	selectTimeCreated,
	selectCredit,
} from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";

import { useGetProfileQuery } from "../features/auth/authApiSlice";

import ProfilePictureModal from "../components/ProfilePictureModal";
import ProfileCourseList from "../components/ProfileCourseList";

export default function UserProfilePage() {
	const role = useAppSelector(selectRole);
	const name = useAppSelector(selectName);
	const email = useAppSelector(selectEmail);
	const timeCreated = useAppSelector(selectTimeCreated);
	const credit = useAppSelector(selectCredit);

	const [skipQueries, setSkipQueries] = useState({
		skipCompleted: role === "STUDENT" ? false : true,
		skipEnrolled: true,
		skipTeacher: role === "TEACHER" ? false : true,
	});

	useGetProfileQuery();

	useEffect(() => {
		setSkipQueries({
			skipCompleted: true,
			skipEnrolled: role === "STUDENT" ? false : true,
			skipTeacher: role === "TEACHER" ? false : true,
		});
	}, [role]);

	return (
		<Flex
			w="100%"
			direction={["column", "column", "column", "row"]}
			justifyContent="space-between"
			alignItems={["center", "center", "center", "center"]}
		>
			<Flex
				w={["100%", "100%", "100%", "45%"]}
				h="100%"
				direction={"column"}
				justifyContent="center"
				alignItems="center"
				p="20px"
				gap={5}
			>
				<Heading>Profile: </Heading>
				{name ? <ProfilePictureModal /> : <Spinner size="xl" />}
				<Box w="100%">
					<Card w="100%" boxShadow="md">
						<CardBody>
							<Stack divider={<StackDivider />}>
								<Flex
									justifyContent="space-between"
									alignItems="center"
								>
									{name ? (
										<Text fontSize="xl">Name: {name}</Text>
									) : (
										<Spinner />
									)}
									{role === "STUDENT" ? (
										<Badge colorScheme="blue">
											Student
										</Badge>
									) : (
										<Badge colorScheme="cyan">
											Teacher
										</Badge>
									)}
								</Flex>
								<Box>
									{email ? (
										<Text fontSize="xl">
											Email: {email}
										</Text>
									) : (
										<Spinner />
									)}
								</Box>
								{role === "STUDENT" && (
									<Box>
										{credit != null ? (
											<Text fontSize="xl">
												Credits: {credit}
											</Text>
										) : (
											<Spinner />
										)}
									</Box>
								)}
								<Box>
									{timeCreated ? (
										<Text fontSize="xl">
											Time Created: {timeCreated}
										</Text>
									) : (
										<Spinner />
									)}
								</Box>
							</Stack>
						</CardBody>
					</Card>
				</Box>
				<Flex
					w="100%"
					textAlign="center"
					direction={["column", "column", "column", "row"]}
					justifyContent="center"
					alignItems="center"
					gap={5}
				>
					<UpdateProfileModal />
					<ChangePasswordModal />
					<SignOutDialog />
				</Flex>
			</Flex>

			<Box maxH="600px" w={["100%", "100%", "100%", "55%"]} p="20px">
				<Heading
					color="#6065EA"
					textAlign={["center", "center", "center", "left"]}
				>
					Courses:{" "}
				</Heading>
				<Box overflowY="scroll" h="100%">
					<Tabs>
						<TabList>
							{role === "STUDENT" ? (
								<>
									<Tab
										onClick={() =>
											setSkipQueries({
												skipCompleted: true,
												skipEnrolled: false,
												skipTeacher: true,
											})
										}
									>
										Enrolled Courses
									</Tab>
									<Tab
										onClick={() => {
											setSkipQueries({
												skipCompleted: false,
												skipEnrolled: true,
												skipTeacher: true,
											});
										}}
									>
										Completed Courses
									</Tab>
								</>
							) : (
								<Tab
									onClick={() =>
										setSkipQueries({
											skipCompleted: true,
											skipEnrolled: true,
											skipTeacher: false,
										})
									}
								>
									Created Courses
								</Tab>
							)}
						</TabList>
						{role === "STUDENT" && (
							<TabPanels>
								<TabPanel>
									<ProfileCourseList
										skipCompleted={
											skipQueries.skipCompleted
										}
										skipEnrolled={skipQueries.skipEnrolled}
										skipTeacher={skipQueries.skipTeacher}
									/>
								</TabPanel>
								<TabPanel>
									<ProfileCourseList
										skipCompleted={
											skipQueries.skipCompleted
										}
										skipEnrolled={skipQueries.skipEnrolled}
										skipTeacher={skipQueries.skipTeacher}
									/>
								</TabPanel>
							</TabPanels>
						)}
						{role === "TEACHER" && (
							<TabPanels>
								<TabPanel>
									<ProfileCourseList
										skipCompleted={
											skipQueries.skipCompleted
										}
										skipEnrolled={skipQueries.skipEnrolled}
										skipTeacher={skipQueries.skipTeacher}
									/>
								</TabPanel>
							</TabPanels>
						)}
					</Tabs>
				</Box>
			</Box>
		</Flex>
	);
}
