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

export const selectTabs = (state: RootState) => {
	return state.tab.tabs;
};

export const selectStatusEnum = (state: RootState) => {
	return state.tab.courseStatus;
};

export default tabSlice.reducer;
