import { Box, Button, Flex, useToast } from "@chakra-ui/react";

import { useParams, useNavigate } from "react-router-dom";

import { useAppSelector } from "../app/hooks";
import {
	selectNextTabId,
	selectPreviousTabId,
} from "../features/tabs/tabsSlice";

import {
	useGetTabByIdQuery,
	useCompleteTabMutation,
} from "../features/tabs/tabsApiSlice";
import { AspectRatio, Badge, Divider, HStack, Heading } from "@chakra-ui/react";
import { RootState } from "../app/store";

export default function TabPage() {
	const toast = useToast();
	const navigate = useNavigate();

	const [completeTab, { isLoading: isLoadingCompleteTab }] =
		useCompleteTabMutation();
	const { courseId, tabId } = useParams<{
		courseId: string;
		tabId: string;
	}>();

	if (!courseId || !tabId) return <div>Tab not found</div>;

	const nextTabId = useAppSelector((state: RootState) =>
		selectNextTabId(state, parseInt(tabId))
	);
	const previousTabId = useAppSelector((state: RootState) =>
		selectPreviousTabId(state, parseInt(tabId))
	);

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
	if (!tab) return <div>Tab not found</div>;

	return (
		<Box mt="10" mx="auto" maxW="container.lg">
			<HStack alignItems={"center"}>
				<Heading>{tab.tabName}</Heading>
				<Badge colorScheme="blue" variant="outline">
					{tab.contentType}
				</Badge>
				{tab.completed && <Badge colorScheme="green">Completed</Badge>}
			</HStack>
			<Divider />
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
				<Heading size="md">Actions:</Heading>
				<Box
					display="flex"
					gap={4}
					flexDirection={{ base: "column", md: "row" }}
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
					<Button
						isDisabled={nextTabId === -1}
						onClick={() => {
							navigate(`/courses/${courseId}/${nextTabId}`);
						}}
					>
						Next
					</Button>
					<Button
						isDisabled={previousTabId === -1}
						onClick={() => {
							navigate(`/courses/${courseId}/${previousTabId}`);
						}}
					>
						Previous
					</Button>
				</Box>
			</Flex>
		</Box>
	);
}
