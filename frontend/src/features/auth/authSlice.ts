import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApiSlice";
import type { RootState } from "../../app/store";
import { Role } from "./authApiSlice";

export interface AuthState {
	token: string | null;
	email: string | null;
	name: string | null;
	role: Role | null;
	timeCreated: string | null;
	credit: number | null;
	picturePath: string | null;
}

const initialState: AuthState = {
	token: localStorage.getItem("token") || null,
	email: null,
	name: null,
	role: null,
	timeCreated: null,
	credit: null,
	picturePath: null,
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
				localStorage.setItem("token", action.payload.token);
				localStorage.setItem(
					"refreshToken",
					action.payload.refreshToken
				);
			}
		);
		builder.addMatcher(
			authApi.endpoints.getProfile.matchFulfilled,
			(state, action) => {
				state.email = action.payload.email;
				state.name = action.payload.name;
				state.role = action.payload.role;
				state.timeCreated = action.payload.timeCreated;
				state.credit = action.payload.credit;
				state.picturePath = action.payload.picturePath;
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
export const selectName = (state: RootState) => state.auth.name;
export const selectRole = (state: RootState) => state.auth.role;
export const selectTimeCreated = (state: RootState) => state.auth.timeCreated;
export const selectCredit = (state: RootState) => state.auth.credit;
export const selectPicturePath = (state: RootState) => state.auth.picturePath;
export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
