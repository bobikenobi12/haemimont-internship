import { createSlice } from "@reduxjs/toolkit";
import { courseApi } from "./courseApiSlice";
import type { RootState } from "../../app/store";
import type { Course } from "./courseApiSlice";

export interface CourseState {
	courses: {
		courses: Course[];
		size: number;
	};
	searchedCourses: {
		courses: Course[];
		size: number;
	};
	enrolledCourses: {
		courses: Course[];
		size: number;
	};
	completedCourses: {
		courses: Course[];
		size: number;
	};
	uncompletedCourses: {
		courses: Course[];
		size: number;
	};
	teacherCourses: {
		courses: Course[];
		size: number;
	};
	coursePageFilters: {
		type:
			| "ALL"
			| "ENROLLED"
			| "COMPLETED"
			| "UNCOMPLETED"
			| "TEACHER"
			| "SEARCH";
		page: number;
		pageSize: number;
		completed?: boolean;
		name?: string;
	};
}

const initialState: CourseState = {
	courses: {
		size: 0,
		courses: [],
	},
	searchedCourses: {
		size: 0,
		courses: [],
	},
	enrolledCourses: {
		size: 0,
		courses: [],
	},
	completedCourses: {
		size: 0,
		courses: [],
	},
	uncompletedCourses: {
		size: 0,
		courses: [],
	},
	teacherCourses: {
		size: 0,
		courses: [],
	},
	coursePageFilters: {
		type: "UNCOMPLETED",
		page: 1,
		pageSize: 10,
	},
};

export const courseSlice = createSlice({
	name: "course",
	initialState,
	reducers: {
		setCoursePageFilters: (state, action) => {
			state.coursePageFilters = {
				...action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			courseApi.endpoints.getAllCourses.matchFulfilled,
			(state, action) => {
				state.courses = action.payload;
			}
		);
		builder.addMatcher(
			courseApi.endpoints.getUncompletedCourses.matchFulfilled,
			(state, action) => {
				state.uncompletedCourses = {
					...action.payload,
				};
			}
		);
		builder.addMatcher(
			courseApi.endpoints.getCompletedCourses.matchFulfilled,
			(state, action) => {
				if (action.meta.arg.originalArgs.completed) {
					state.completedCourses = action.payload;
				} else {
					state.enrolledCourses = action.payload;
				}
			}
		);
		builder.addMatcher(
			courseApi.endpoints.getTeacherCourses.matchFulfilled,
			(state, action) => {
				state.teacherCourses = action.payload;
			}
		);
		builder.addMatcher(
			courseApi.endpoints.findCoursesByName.matchFulfilled,
			(state, action) => {
				state.searchedCourses = {
					...action.payload,
				};
			}
		);
	},
});

export const { setCoursePageFilters } = courseSlice.actions;

export const selectCourses = (state: RootState) => state.course.courses;
export const selectSearchedCourses = (state: RootState) =>
	state.course.searchedCourses;
export const selectEnrolledCourses = (state: RootState) =>
	state.course.enrolledCourses;
export const selectCompletedCourses = (state: RootState) =>
	state.course.completedCourses;
export const selectUncompletedCourses = (state: RootState) =>
	state.course.uncompletedCourses;
export const selectTeacherCourses = (state: RootState) =>
	state.course.teacherCourses;
export const selectCoursePageFilters = (state: RootState) =>
	state.course.coursePageFilters;

export default courseSlice.reducer;
