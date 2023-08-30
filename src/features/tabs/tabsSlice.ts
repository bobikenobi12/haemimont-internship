import { createSlice } from "@reduxjs/toolkit";
import { courseApi } from "../courses/courseApiSlice";
import type { RootState } from "../../app/store";
import type { TabPreview } from "./tabsApiSlice";
import { CourseStatus } from "../courses/courseApiSlice";
export interface TabState {
	tabs: TabPreview[];
	courseStatus?: CourseStatus;
}

const initialState: TabState = {
	tabs: [],
};

export const tabSlice = createSlice({
	name: "tab",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			courseApi.endpoints.getCourseById.matchFulfilled,
			(state, action) => {
				if (action.payload.course.tabs) {
					state.tabs = action.payload.course.tabs;
				}
				state.courseStatus = action.payload.stateEnum;
			}
		);
	},
});

export const selectNextTabId = (state: RootState, tabId: number) => {
	const index = state.tab.tabs.findIndex((tab) => tab.tab_id === tabId);
	if (index === -1) {
		return -1;
	}
	if (index === state.tab.tabs.length - 1) {
		return -1;
	}
	return state.tab.tabs[index + 1].tab_id;
};

export const selectPreviousTabId = (state: RootState, tabId: number) => {
	const index = state.tab.tabs.findIndex((tab) => tab.tab_id === tabId);
	if (index === -1) {
		return -1;
	}
	if (index === 0) {
		return -1;
	}
	return state.tab.tabs[index - 1].tab_id;
};

export const areTabsCompleted = (state: RootState) => {
	return state.tab.tabs.every((tab) => tab.completed);
};

export const selectStatusEnum = (state: RootState) => {
	return state.tab.courseStatus;
};

export default tabSlice.reducer;
