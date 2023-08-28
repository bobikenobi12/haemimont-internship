import { Box } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

import { useGetTabByIdQuery } from "../features/tabs/tabsApiSlice";
import { AspectRatio, Badge, Divider, HStack, Heading } from "@chakra-ui/react";

export default function TabPage() {
	const { courseId, tabId } = useParams<{
		courseId: string;
		tabId: string;
	}>();

	if (!courseId || !tabId) return <div>Tab not found</div>;

	const {
		data: tab,
		error,
		isLoading,
	} = useGetTabByIdQuery({
		courseId: parseInt(courseId),
		tabId: parseInt(tabId),
	});

	if (error) return <div>Failed to load tab</div>;
	if (isLoading) return <div>Loading...</div>;
	if (!tab) return <div>Tab not found</div>;

	return (
		<Box mt="10" mx="auto" maxW="container.lg">
			<HStack>
				<Heading>{tab.tabName}</Heading>
				<Badge colorScheme="blue" variant="outline">
					{tab.contentType}
				</Badge>
			</HStack>
			<Divider />
			{tab.contentType === "TEXT" ? (
				<Box>{tab.content}</Box>
			) : (
				<AspectRatio ratio={16 / 9}>
					<iframe
						src={import.meta.env.VITE_API_URL + tab.content}
						allowFullScreen
					/>
				</AspectRatio>
			)}
			{tab.completed && <Badge colorScheme="green">Completed</Badge>}
		</Box>
	);
}
