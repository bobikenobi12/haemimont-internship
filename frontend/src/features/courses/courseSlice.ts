import { createSlice } from "@reduxjs/toolkit";
import { courseApi } from "./courseApiSlice";
import type { RootState } from "../../app/store";
import type { Course } from "./courseApiSlice";

export interface CourseState {
	courses: Course[];
	size: number;
}

const initialState: CourseState = {
	courses: [],
	size: 0,
};

export const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			courseApi.endpoints.getAllCourses.matchFulfilled,
			(state, action) => {
				state.courses = action.payload.courses;
				state.size = action.payload.size;
			}
		);
		builder.addMatcher(
			courseApi.endpoints.getUncompletedCourses.matchFulfilled,
			(state, action) => {
				state.courses = action.payload.courses;
				state.size = action.payload.size;
			}
		);
	},
});

export const selectCourses = (state: RootState) => state.course.courses;
export const selectCourse = (state: RootState, courseId: number) =>
	state.course.courses.find((course) => course.courseId === courseId);
export const selectCourseSize = (state: RootState) => state.course.size;

export default courseSlice.reducer;
