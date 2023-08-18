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
	description: string;
	credit: number;
	duration: number;
	teacher: Teacher;
	picturePath: string;
	studentCount: number;
}

export interface CreateCourseRequest {
	courseName: string;
	description: string;
	credit: number;
	duration: number;
}

export interface PaginationRequest {
	page: number;
	pageSize: number;
}

export interface CourseResponse<T> {
	courses: T[];
	size: number;
}

export const courseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createCourse: builder.mutation<void, CreateCourseRequest>({
			query: ({ courseName, description, credit, duration }) => ({
				url: "courses/create",
				method: "POST",
				body: { courseName, description, credit, duration },
			}),
		}),
		setPicture: builder.mutation<
			void,
			{ courseId: number; formData: FormData }
		>({
			query: ({ courseId, formData }) => ({
				url: `courses/setPicture/${courseId}`,
				method: "POST",
				body: formData,
			}),
		}),
		joinCourse: builder.mutation<void, { courseId: number }>({
			query: ({ courseId }) => ({
				url: `courses/sign/${courseId}`,
				method: "POST",
			}),
		}),
		completeCourse: builder.mutation<void, { courseId: number }>({
			query: ({ courseId }) => ({
				url: `courses/complete/${courseId}`,
				method: "POST",
			}),
			invalidatesTags: ["Course", "Profile"],
		}),
		getCompletedCourses: builder.query<
			CourseResponse<Course>,
			PaginationRequest
		>({
			query: ({ page = 1, pageSize = 10 }) => ({
				url: "courses/completed",
				params: { page, pageSize },
			}),
			providesTags: ["Course"],
		}),
		getAllCourses: builder.query<CourseResponse<Course>, PaginationRequest>(
			{
				query: ({ page = 1, pageSize = 10 }) => ({
					url: "courses/findAll",
					params: { page, pageSize },
				}),
				providesTags: ["Course"],
			}
		),
		getUncompletedCourses: builder.query<
			CourseResponse<Course>,
			PaginationRequest
		>({
			query: ({ page = 1, pageSize = 10 }) => ({
				url: "courses/uncompleted",
				params: { page, pageSize },
			}),
			providesTags: ["Course"],
		}),
		getTeacherCourses: builder.query<
			CourseResponse<Course>,
			PaginationRequest
		>({
			query: ({ page = 1, pageSize = 10 }) => ({
				url: "courses/findMyCourses",
				params: { page, pageSize },
			}),
			providesTags: ["Course"],
		}),
		editCourse: builder.mutation<void, { courseId: number }>({
			query: ({ courseId }) => ({
				url: `courses/edit`,
				method: "POST",
				body: { courseId },
			}),
			invalidatesTags: ["Course"],
		}),
	}),
});

export const {
	useCreateCourseMutation,
	useSetPictureMutation,
	useJoinCourseMutation,
	useCompleteCourseMutation,
	useGetCompletedCoursesQuery,
	useGetUncompletedCoursesQuery,
} = courseApi;
