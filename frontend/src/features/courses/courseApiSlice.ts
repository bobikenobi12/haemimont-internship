import { apiSlice } from "../../app/api/apiSlice";
import { Role } from "../auth/authApiSlice";

export interface Teacher {
	name: string;
	user: {
		email: string;
		role: Role;
		timeCreated: Date;
	};
}

export interface Course {
	courseId: number;
	courseName: string;
	credit: number;
	teacher: Teacher;
}

export interface CreateCourseRequest {
	courseName: string;
	credit: number;
}

export interface PaginationRequest {
	page: number;
	pageSize: number;
}

export const courseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createCourse: builder.mutation<void, CreateCourseRequest>({
			query: ({ courseName, credit }) => ({
				url: "courses/create",
				method: "POST",
				body: { courseName, credit },
			}),
		}),
		completeCourse: builder.mutation<void, { courseId: number }>({
			query: (courseId) => ({
				url: `courses/complete/${courseId}`,
				method: "POST",
			}),
		}),
		getCompletedCourses: builder.mutation<Course, PaginationRequest>({
			query: ({ page, pageSize }) => ({
				url: "courses/completed",
				method: "POST",
				body: { page, pageSize },
			}),
		}),
		getUncompletedCourses: builder.mutation<Course, PaginationRequest>({
			query: ({ page, pageSize }) => ({
				url: "courses/uncompleted",
				method: "POST",
				body: { page, pageSize },
			}),
		}),
	}),
});

export const {
	useCreateCourseMutation,
	useCompleteCourseMutation,
	useGetCompletedCoursesMutation,
	useGetUncompletedCoursesMutation,
} = courseApi;
