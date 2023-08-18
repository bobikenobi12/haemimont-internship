import Dropzone from "react-dropzone";
import { Flex, Text } from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";

interface Props {
	onDrop: (acceptedFiles: File[]) => void;
}

export default function FileUpload({ onDrop }: Props) {
	return (
		<Dropzone onDrop={onDrop}>
			{({ getRootProps, getInputProps, isDragActive }: any) => (
				<Flex
					{...getRootProps()}
					direction="column"
					align="center"
					justify="center"
					w={"100%"}
					h={"100%"}
					border="2px"
					borderStyle="dashed"
					borderColor="gray.300"
					cursor="pointer"
					_hover={{
						borderColor: "gray.500",
					}}
				>
					<input {...getInputProps()} />
					<FiUpload size={24} />
					<Text>{isDragActive ? "Drop" : "Upload"} a file</Text>
				</Flex>
			)}
		</Dropzone>
	);
}
