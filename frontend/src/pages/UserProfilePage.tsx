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
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

import UpdateProfileModal from "../components/UpdateProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import SignOutDialog from "../components/SignOutDialog";

export default function UserProfilePage() {
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
				<Heading color="#6065EA">Profile: </Heading>
				<Avatar size="3xl"></Avatar>
				<Box w="100%">
					<Card w="100%" boxShadow="md">
						<CardBody>
							<Stack divider={<StackDivider />}>
								<Flex
									justifyContent="space-between"
									alignItems="center"
								>
									<Text fontSize="xl">
										Name: Cvetelina Petkova
									</Text>
									<Badge colorScheme="cyan">
										{" "}
										Instructor{" "}
									</Badge>
								</Flex>
								<Box>
									<Text fontSize="xl">
										Email: gnr.gnfr@gmail.com
									</Text>
								</Box>
								<Box>
									<Text fontSize="xl">Credits: 142</Text>
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
