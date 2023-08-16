import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setToken } from "../../features/auth/authSlice";
import { authApi } from "../../features/auth/authApiSlice";
import { RootState } from "../../app/store";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL as string,
	prepareHeaders: (headers, { getState, endpoint }) => {
		if (endpoint?.includes("refreshToken")) {
			headers.set(
				"Authorization",
				`Bearer ${localStorage.getItem("refreshToken")}`
			);
		}
		const token = (getState() as RootState).auth.token;
		if (token && endpoint?.includes("refreshToken") === false) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
	const result = await baseQuery(args, api, extraOptions);

	if (result.error?.status === 403) {
		const refreshResult = await api.dispatch(
			authApi.endpoints.refreshToken.initiate(undefined)
		);
		if (refreshResult.error) {
			api.dispatch(logOut());
			return result;
		}
		const { token, refreshToken } = refreshResult.data;
		api.dispatch(setToken(token));
		localStorage.setItem("refreshToken", refreshToken);
		return baseQuery(args, api, extraOptions);
	}
	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Profile", "Course"],
	endpoints: () => ({}),
});
