import { Input, InputGroup, InputLeftElement, Box } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () => {
	return (
		<>
			<Box display={{ base: "none", md: "block" }}>
				<InputGroup borderRadius={5} size="sm">
					<InputLeftElement
						children={<Search2Icon color="gray.600" />}
					/>
					<Input
						type="text"
						placeholder="Search..."
						borderRadius={5}
						border="1px solid #949494"
					/>
				</InputGroup>
			</Box>
		</>
	);
};
