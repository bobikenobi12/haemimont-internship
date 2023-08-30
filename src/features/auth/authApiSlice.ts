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

export interface ChangePasswordRequest {
	password: string;
	currentPassword: string;
}

export interface Profile {
	email: string;
	name: string;
	role: Role;
	timeCreated: string;
	credit: number;
	picturePath: string;
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
		getProfile: builder.query<Profile, void>({
			query: () => ({
				url: "user/getProfile",
				method: "GET",
			}),
			keepUnusedDataFor: 60 * 60 * 1000, // 1 hour
			providesTags: ["Profile"],
		}),
		setProfilePicture: builder.mutation<void, FormData>({
			query: (formdata) => ({
				url: "user/setProfilePic",
				method: "POST",
				body: formdata,
			}),
			invalidatesTags: ["Profile"],
		}),
		updateName: builder.mutation<void, { name: string }>({
			query: ({ name }) => ({
				url: "user/updateName",
				method: "POST",
				body: { name },
			}),
			invalidatesTags: ["Profile"],
		}),
		changeEmail: builder.mutation<void, { email: string }>({
			query: ({ email }) => ({
				url: "user/changeEmail",
				method: "POST",
				body: { email },
			}),
			invalidatesTags: ["Profile"],
		}),
		changePassword: builder.mutation<void, ChangePasswordRequest>({
			query: ({ password, currentPassword }) => ({
				url: "user/changePassword",
				method: "POST",
				body: { password, currentPassword },
			}),
			invalidatesTags: ["Profile"],
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: "user/logout",
				method: "GET",
				responseHandler: "text",
			}),
		}),
		refreshToken: builder.query<Tokens, void>({
			query: () => ({
				url: "user/refresh/v1",
				method: "GET",
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useGetProfileQuery,
	useLazyGetProfileQuery,
	useSetProfilePictureMutation,
	useUpdateNameMutation,
	useChangeEmailMutation,
	useChangePasswordMutation,
	useLogoutMutation,
	usePrefetch,
} = authApi;
