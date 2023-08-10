import {
	Flex,
	Text,
	Heading,
	Card,
	CardBody,
	Badge,
	Box,
	Container,
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

export default function UserProfilePage() {
	return (
		<>
			<Flex
				w="100%"
				direction={["column", "column", "column", "row"]}
				justifyContent="space-between"
				alignItems={["center", "center", "center", "center"]}
				h="100vh"
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
					<Container w="100%" p={0}>
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
					</Container>
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
															Here is the
															description of the
															course.
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
		</>
	);
}
