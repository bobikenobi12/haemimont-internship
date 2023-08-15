import {
	Box,
	Card,
	CardBody,
	Image,
	Text,
	Heading,
	Button,
	Center,
	Flex,
} from "@chakra-ui/react";

export default function CourseSignUpPage() {
	return (
		<>
			<Card
				direction={{ base: "column", sm: "row" }}
				overflow="hidden"
				variant="outline"
			>
				<Image
					objectFit="cover"
					src="https://logos-world.net/wp-content/uploads/2022/07/Java-Logo.jpg"
					alt="Course Logo"
					w={{ base: "100%", sm: "40%" }}
				/>
				<CardBody>
					<Flex
						justifyContent="center"
						gap={4}
						direction={"column"}
						h="100%"
					>
						<Heading fontSize="3xl"> Java Fundamentals</Heading>
						<Flex
							justifyContent="space-between"
							direction={{
								base: "column",
								md: "column",
								lg: "row",
							}}
						>
							<Text fontSize="xl">12.05.2023 - 15.07.2023</Text>
							<Text fontSize="xl">
								Instructor: Emilia Ivanova
							</Text>
							<Text fontSize="xl">Credits: 80</Text>
						</Flex>
					</Flex>
				</CardBody>
			</Card>
			<Card variant={"filled"}>
				<CardBody>
					<Text fontSize="lg">
						<p>
							Donde miles temor ma cosen id finas yo. Volvio tu
							vencer dramas da no su. Madrugar mal don benditos
							cominero mar esencias uso.
						</p>
						<p>
							En intimas tambien no oh va renglon. Posible los van
							merecia suo eso resulto. Asi naufragos resonaban
							moribundo pre.
						</p>
						<p>
							Foro hubo emma va se. Andaba asi que juntos los que
							formas. Aptitudes simpatias me mostrarse indefenso
							el explicaba.
						</p>
						<p>
							Arruinado consiguio restaurar no pluguiera tu le.
							Cantante cantidad esa contesto presento del inferior
							eso entonces.
						</p>
						<p>
							Atreveria traspunte religiosa revolvian yo he. Les
							atraer jugado las propio don bultos ano ruines.
						</p>
					</Text>
					<Center>
						<Button colorScheme="purple">Join the course</Button>
					</Center>
				</CardBody>
			</Card>
		</>
	);
}
