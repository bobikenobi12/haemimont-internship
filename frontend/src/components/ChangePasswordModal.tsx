// import {
// 	useToast,
// 	useDisclosure,
// } from "@chakra-ui/react";

// import { useForm } from "react-hook-form";

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// export default function ChangePasswordModal() {

// const changePasswordSchema = z
// 	.object({
// 		currentPassword: z
// 			.string()
// 			.min(8, {
// 				message: "Password must be atleast 8 characters",
// 			})
// 			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
// 				message:
// 					"Password must contain atleast one uppercase letter, one lowercase letter and one number",
// 			})
// 			.max(72, {
// 				message: "Password can be 72 characters at most",
// 			}),
// 		newPassword: z
// 			.string()
// 			.min(8, {
// 				message: "Password must be atleast 8 characters",
// 			})
// 			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
// 				message:
// 					"Password must contain atleast one uppercase letter, one lowercase letter and one number",
// 			})
// 			.max(72, {
// 				message: "Password can be 72 characters at most",
// 			}),
// 		confirmNewPassword: z
// 			.string()
// 			.min(8, {
// 				message: "Password must be atleast 8 characters",
// 			})
// 			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
// 				message:
// 					"Password must contain atleast one uppercase letter, one lowercase letter and one number",
// 			})
// 			.max(30, {
// 				message: "Password can be 72 characters at most",
// 			}),
// 	})
// 	.refine((data) => data.newPassword === data.confirmNewPassword, {
// 		message: "Passwords don't match",
// 		path: ["confirmNewPassword"],
// 	});

// type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

// const {
// 	register,
// 	setError,
// 	handleSubmit,
// 	reset,
// 	formState: {
// 		errors,
// 		isSubmitting,
// 	},
// } = useForm<ChangePasswordFormValues>({
// 	resolver: zodResolver(changePasswordSchema),
// });

// const {
//     isOpen: isOpenChangePassword,
//     onOpen: onOpenChangePassword,
//     onClose: onCloseChangePassword,
// } = useDisclosure();

// const toast = useToast();

// const onSubmitChangePassword: SubmitHandler<ChangePasswordFormValues> = async (data) => {
// try {
// 	await changePassword({
// 		currentPassword: data.currentPassword,
// 		newPassword: data.newPassword,
// }).unwrap();
// toast({
// 	title: t("changePassword.successTitle"),
// 	description: t("changePassword.successDescription"),
// 	status: "success",
// 	duration: 5000,
// 	isClosable: true,
// });
// onCloseChangePassword();
// resetChangePassword();
// } catch (err) {
// if (err instanceof ZodError) {
// 	err.errors.forEach((error) => {
// 		if (error.path) {
// 			setErrorChangePassword(
// 				error.path[0] as keyof ChangePasswordFormValues,
// 				{
// 					type: "manual",
// 					message: error.message,
// 				}
// 			);
// 		}
// 	});
// } else {
// 	toast({
// 		title: t("changePassword.error.title"),
// 		description: t("changePassword.error.description"),
// 		status: "error",
// 		duration: 5000,
// 		isClosable: true,
// 	});
// }
// }
// };
