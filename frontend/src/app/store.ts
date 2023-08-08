import { configureStore, combineReducers } from "@reduxjs/toolkit";

// slices
import { authSlice } from "../features/auth/authSlice";

// api
import { authApi } from "../features/auth/authApiSlice";

const appReducer = combineReducers({
	auth: authSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
});

const rootReducer = (state: any, action: any) => {
	if (action.type === "auth/logout") {
		console.log("logout in store.ts");
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
		}).concat(authApi.middleware);
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
