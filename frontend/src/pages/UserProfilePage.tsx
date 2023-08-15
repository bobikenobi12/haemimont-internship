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
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	AccordionIcon,
	Button,
	Avatar,
	Spinner,
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

export default function UserProfilePage() {
	const role = useAppSelector(selectRole);
	const name = useAppSelector(selectName);
	const email = useAppSelector(selectEmail);
	const timeCreated = useAppSelector(selectTimeCreated);
	const credit = useAppSelector(selectCredit);

	const { error, isLoading } = useGetProfileQuery();

	console.log(credit);
	if (isLoading) {
		return <Spinner />;
	}

	if (error) {
		return <Text>Error</Text>;
	}

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
				{name ? (
					<Avatar size="2xl" name={name} />
				) : (
					<Spinner size="xl" />
				)}
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
					<Card>
						<Stack>
							<CardBody>
								<Accordion defaultIndex={[0]}>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
										(course) => (
											<AccordionItem key={course}>
												<AccordionButton>
													<Box
														flex="1"
														textAlign="left"
													>
														Course Name
													</Box>
													<AccordionIcon />
												</AccordionButton>
												<AccordionPanel pb={4}>
													<Text>
														{" "}
														Here is the description
														of the course.
													</Text>
													<Button
														colorScheme="blue"
														mt={4}
													>
														View Course
													</Button>
												</AccordionPanel>
											</AccordionItem>
										)
									)}
								</Accordion>
							</CardBody>
						</Stack>
					</Card>
				</Box>
			</Box>
		</Flex>
	);
}
