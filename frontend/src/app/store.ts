import { configureStore, combineReducers } from "@reduxjs/toolkit";

const appReducer = combineReducers({});

const rootReducer = (state: any, action: any) => {
	if (action.type === "auth/logout") {
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
		}).concat();
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
