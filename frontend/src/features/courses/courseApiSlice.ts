import { apiSlice } from "../../app/api/apiSlice";
import { Role } from "../auth/authApiSlice";

export interface Teacher {
	name: string;
	user: {
		id: number;
		email: string;
		role: Role;
		timeCreated: string;
		picturePath: string;
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
	studentsCount: number;
	time_created: string;
}

export enum CourseStatus {
	COMPLETED = "COMPLETED",
	CAN_COMPLETE = "CAN_COMPLETE",
	CAN_ENROLL = "CAN_ENROLL",
}

export interface CreateCourseRequest {
	courseName: string;
	description: string;
	credit: number;
	duration: number;
}

export interface EditCourseRequest {
	courseId: number;
	courseName: string;
	description: string;
}
export interface PaginationRequest {
	page: number;
	pageSize: number;
	completed?: boolean;
	name?: string;
}

export interface CourseResponse<T> {
	courses: T[];
	size: number;
}

export enum ContentType {
	TEXT = "TEXT",
	VIDEO = "VIDEO",
}
export interface CreateCourseTabRequest {
	contentType: ContentType;
	content: string;
	course: {
		courseId: number;
	};
}

export const courseApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createCourse: builder.mutation<void, CreateCourseRequest>({
			query: ({ courseName, description, credit, duration }) => ({
				url: "courses/create",
				method: "POST",
				body: { courseName, description, credit, duration },
			}),
			invalidatesTags: ["Course"],
		}),
		setPicture: builder.mutation<
			void,
			{ courseId: number; formdata: FormData }
		>({
			query: ({ courseId, formdata }) => ({
				url: `courses/setPicture/${courseId}`,
				method: "POST",
				body: formdata,
			}),
			invalidatesTags: ["Course"],
		}),
		joinCourse: builder.mutation<void, { courseId: number }>({
			query: ({ courseId }) => ({
				url: `courses/sign/${courseId}`,
				method: "POST",
			}),
			invalidatesTags: ["Course", "Profile"],
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
			query: ({ page = 1, pageSize = 10, completed }) => ({
				url: "courses/completed",
				params: { page, pageSize, completed },
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
		findCoursesByName: builder.query<
			CourseResponse<Course>,
			PaginationRequest
		>({
			query: ({ page = 1, pageSize = 10, name }) => ({
				url: "courses/findAllByName",
				params: { page, pageSize, name },
			}),
			keepUnusedDataFor: 0,
			providesTags: ["Course"],
		}),
		getUncompletedCourses: builder.query<
			CourseResponse<Course>,
			PaginationRequest
		>({
			query: ({ page = 1, pageSize = 10 }) => ({
				url: "courses/uncompleted",
				params: { page, pageSize },
			}),
			keepUnusedDataFor: 0,
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
		getCourseById: builder.query<
			{
				course: Course;
				stateEnum?: CourseStatus;
			},
			{ courseId: number }
		>({
			query: ({ courseId }) => ({
				url: `courses/findCourseById/${courseId}`,
			}),
			providesTags: ["Course"],
		}),
		editCourse: builder.mutation<void, EditCourseRequest>({
			query: ({ courseId, courseName, description }) => ({
				url: `courses/edit`,
				method: "POST",
				body: { courseId, courseName, description },
			}),
			invalidatesTags: ["Course"],
		}),
		createCourseTab: builder.mutation<void, CreateCourseTabRequest>({
			query: ({ content, contentType, course }) => ({
				url: `courses/tabs/create`,
				method: "POST",
				body: { content, contentType, course },
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
	useGetAllCoursesQuery,
	useGetTeacherCoursesQuery,
	useFindCoursesByNameQuery,
	useGetCourseByIdQuery,
	useEditCourseMutation,
} = courseApi;
