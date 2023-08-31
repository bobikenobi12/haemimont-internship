import {
	Box,
	Button,
	Flex,
	Icon,
	IconButton,
	Tooltip,
	useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useParams, useNavigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import { selectRole } from "../features/auth/authSlice";

import { selectTabs } from "../features/tabs/tabsSlice";

import {
	useGetTabByIdQuery,
	useCompleteTabMutation,
} from "../features/tabs/tabsApiSlice";

import { useGetCourseByIdQuery } from "../features/courses/courseApiSlice";

import { AspectRatio, Badge, Divider, HStack, Heading } from "@chakra-ui/react";

export default function TabPage() {
	const role = useAppSelector(selectRole);
	const tabs = useAppSelector(selectTabs);
	const toast = useToast();
	const navigate = useNavigate();

	const [completeTab, { isLoading: isLoadingCompleteTab }] =
		useCompleteTabMutation();
	const { courseId, tabId } = useParams<{
		courseId: string;
		tabId: string;
	}>();

	if (!courseId || !tabId) return <div>Tab not found</div>;

	useGetCourseByIdQuery({
		courseId: parseInt(courseId),
	});

	const {
		data: tab,
		error,
		isLoading,
	} = useGetTabByIdQuery({
		courseId: parseInt(courseId),
		tabId: parseInt(tabId),
	});

	if (error) return <div>Failed to load tab</div>;
	if (isLoading || isLoadingCompleteTab) return <div>Loading...</div>;
	if (!tab || !tabs) return <div>Tab not found</div>;

	console.log(tabs);

	return (
		<Box mt="10" mx="auto" maxW="container.lg">
			<Flex
				justifyContent="flex-start"
				alignItems="center"
				gap={4}
				ml={4}
			>
				<Tooltip
					label={"Back to course"}
					aria-label={"Back to course"}
					hasArrow
				>
					<IconButton
						aria-label="Back"
						icon={<Icon as={ArrowBackIcon} />}
						onClick={() => {
							navigate(`/courses/${courseId}`);
						}}
					/>
				</Tooltip>
				<HStack alignItems={"center"} gap={4}>
					<Heading>{tab.tabName}</Heading>
					<Flex
						direction={{ base: "column", md: "row" }}
						gap={2}
						alignItems={"center"}
					>
						<Badge colorScheme="blue" variant="outline">
							{tab.contentType}
						</Badge>
						{tab.completed && (
							<Badge colorScheme="green">Completed</Badge>
						)}
					</Flex>
				</HStack>
			</Flex>
			<Divider my={4} />
			{tab.contentType === "TEXT" ? (
				<Box>{tab.content}</Box>
			) : (
				<AspectRatio ratio={16 / 9}>
					<video controls width={"100%"}>
						<source
							src={import.meta.env.VITE_API_URL + tab.content}
						/>
					</video>
				</AspectRatio>
			)}
			<Flex
				justify="space-between"
				direction="column"
				align={"center"}
				p={4}
				gap={4}
			>
				{role === "STUDENT" && (
					<Tooltip
						label={
							tab.completed
								? "You have already completed this tab"
								: ""
						}
						aria-label={
							tab.completed
								? "You have already completed this tab"
								: ""
						}
						hasArrow
					>
						<Button
							isDisabled={tab.completed}
							onClick={async () => {
								try {
									await completeTab({
										courseId: parseInt(courseId),
										tabId: parseInt(tabId),
									}).unwrap();
									toast({
										title: "Tab completed",
										status: "success",
										duration: 3000,
										isClosable: true,
									});
								} catch (err) {
									toast({
										title: "Failed to complete tab",
										status: "error",
										duration: 5000,
										isClosable: true,
									});
								}
							}}
						>
							Mark as completed
						</Button>
					</Tooltip>
				)}
				<Flex gap={4} direction={{ base: "column", md: "row" }}>
					<Flex gap={2}>
						{tabs.map((tab, idx) => {
							return (
								<Box
									aria-label={"Tab" + (idx + 1)}
									key={idx}
									onClick={() => {
										navigate(
											`/courses/${courseId}/${tab.tab_id}`
										);
									}}
									as={Button}
									colorScheme={
										tab.completed ? "green" : "purple"
									}
									variant="outline"
									border={
										tab.tab_id === parseInt(tabId)
											? "2px solid"
											: "none"
									}
								>
									{idx + 1}
								</Box>
							);
						})}
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
}
