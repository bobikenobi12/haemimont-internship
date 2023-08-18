import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	Heading,
	Button,
	useDisclosure,
} from "@chakra-ui/react";

import CreateCourseForm from "./CreateCourseForm";

export default function CreateCourseModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button onClick={onOpen}>Create Course</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create Course</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Heading size="md" mb={4}>
							Create a new course
						</Heading>
						<CreateCourseForm onClose={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
