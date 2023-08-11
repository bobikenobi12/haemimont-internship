import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApiSlice";
import type { RootState } from "../../app/store";

export interface AuthState {
	token: string | null;
	email: string | null;
	name: string | null;
}

const initialState: AuthState = {
	token: localStorage.getItem("token") || null,
	email: null,
	name: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.email = action.payload.email;
			state.name = action.payload.name;
		},
		setToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		},
		logOut: (state) => {
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, action) => {
				state.token = action.payload.token;
				console.log(action.payload);
				localStorage.setItem("token", action.payload.token);
				localStorage.setItem(
					"refreshToken",
					action.payload.refreshToken
				);
			}
		);
		builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
			state.token = null;
			localStorage.removeItem("token");
			localStorage.removeItem("refreshToken");
		});
	},
});

export const { setCredentials, setToken, logOut } = authSlice.actions;

export const selectEmail = (state: RootState) => state.auth.email;
export const selectToken = (state: RootState) => state.auth.token;
export const selectGivenName = (state: RootState) => state.auth.name;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
