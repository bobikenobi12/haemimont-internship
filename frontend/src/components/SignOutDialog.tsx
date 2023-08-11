import { useRef } from "react";

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	Button,
	useToast,
	useDisclosure,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useLogoutMutation } from "../features/auth/authApiSlice";

export default function SignOutDialog() {
	const [signOut, { isLoading: isSigningOut }] = useLogoutMutation();

	const toast = useToast();
	const navigate = useNavigate();

	const {
		isOpen: isOpenSignout,
		onOpen: onOpenSignout,
		onClose: onCloseSignout,
	} = useDisclosure();
	const cancelRefSignout = useRef(null);

	return (
		<>
			<Button
				colorScheme="red"
				variant="outline"
				onClick={onOpenSignout}
				isLoading={isSigningOut}
			>
				Sign Out
			</Button>
			<AlertDialog
				isOpen={isOpenSignout}
				leastDestructiveRef={cancelRefSignout}
				onClose={onCloseSignout}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Sign Out
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You will be signed out.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRefSignout}
								onClick={onCloseSignout}
							>
								Cancel
							</Button>
							<Button
								colorScheme="red"
								onClick={async () => {
									try {
										await signOut().unwrap();
										toast({
											title: "Signed out successfully!",
											description:
												"You have been signed out successfully!",
											status: "info",
											duration: 5000,
											isClosable: true,
										});
										navigate("/");
										onCloseSignout();
									} catch (error: any) {
										console.log(error);
										toast({
											title: "An error occurred.",
											description:
												error.data?.message ||
												"Something went wrong.",
											status: "error",
											duration: 5000,
											isClosable: true,
										});
									}
								}}
								ml={3}
								isLoading={isSigningOut}
							>
								Sign Out
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}
