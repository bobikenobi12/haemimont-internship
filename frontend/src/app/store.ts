import { configureStore, combineReducers } from "@reduxjs/toolkit";

// slices
import { authSlice } from "../features/auth/authSlice";

// api
import { apiSlice } from "./api/apiSlice";

const appReducer = combineReducers({
	auth: authSlice.reducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === "auth/logout") {
		console.log("logout");
		state = undefined;
	}
	if (action.type === "auth/logOut") {
		console.log("logOut");
		state = undefined;
	}
	return appReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}).concat(apiSlice.middleware);
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
