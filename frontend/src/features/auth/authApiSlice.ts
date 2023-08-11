import { apiSlice } from "../../app/api/apiSlice";

export enum Role {
	STUDENT = "STUDENT",
	TEACHER = "TEACHER",
}

export interface RegisterRequest {
	email: string;
	name: string;
	password: string;
	role: Role;
}

export interface Tokens {
	token: string;
	refreshToken: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation<any, RegisterRequest>({
			query: ({ email, name, password, role }) => ({
				url: "user/register",
				method: "POST",
				body: { email, name, password, role },
			}),
		}),
		login: builder.mutation<Tokens, LoginRequest>({
			query: ({ email, password }) => ({
				url: "user/login",
				method: "POST",
				body: { email, password },
			}),
		}),
		updateName: builder.mutation<void, { name: string }>({
			query: (name) => ({
				url: "user/updateName",
				method: "POST",
				body: { name },
			}),
		}),
		changeEmail: builder.mutation<void, { email: string }>({
			query: (email) => ({
				url: "user/changeEmail",
				method: "POST",
				body: { email },
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "user/logout",
				method: "GET",
				responseHandler: "text",
			}),
		}),
		refreshToken: builder.mutation<Tokens, void>({
			query: () => ({
				url: "user/refresh/v1",
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"refreshToken"
					)}`,
				},
				responseHandler: "text",
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useUpdateNameMutation,
	useChangeEmailMutation,
	useLogoutMutation,
} = authApi;
