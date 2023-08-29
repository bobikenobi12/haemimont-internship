import { apiSlice } from "../../app/api/apiSlice";
import { Role } from "../auth/authApiSlice";
import type { TabPreview } from "../tabs/tabsApiSlice";
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
	rating: number;
	tabs?: TabPreview[];
}

export enum CourseStatus {
	COMPLETED = "COMPLETED",
	START_QUIZ = "START_QUIZ",
	COMPLETE_TABS = "COMPLETE_TABS",
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
			invalidatesTags: (arg: any) => [
				{
					type: "Course" as const,
					id: arg.courseId as number,
				},
				"Course",
				"Profile",
			],
		}),
		completeCourse: builder.mutation<void, { courseId: number }>({
			query: ({ courseId }) => ({
				url: `courses/complete/${courseId}`,
				method: "POST",
			}),
			invalidatesTags: (arg: any) => [
				{
					type: "Course" as const,
					id: arg.courseId as number,
				},
				"Course",
				"Profile",
			],
		}),
		getCompletedCourses: builder.query<
			CourseResponse<Course>,
			PaginationRequest
		>({
			query: ({ page = 1, pageSize = 10, completed }) => ({
				url: "courses/completed",
				params: { page, pageSize, completed },
			}),
			providesTags: (result) =>
				result
					? [
							...result.courses.map(
								({ courseId }) =>
									({
										type: "Course" as const,
										id: courseId,
									} as const)
							),
							"Course",
					  ]
					: ["Course"],
		}),
		getAllCourses: builder.query<CourseResponse<Course>, PaginationRequest>(
			{
				query: ({ page = 1, pageSize = 10 }) => ({
					url: "courses/findAll",
					params: { page, pageSize },
				}),
				providesTags: (result) =>
					result
						? [
								...result.courses.map(
									({ courseId }) =>
										({
											type: "Course" as const,
											id: courseId,
										} as const)
								),
								"Course",
						  ]
						: ["Course"],
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
			providesTags: (result) =>
				result
					? [
							...result.courses.map(
								({ courseId }) =>
									({
										type: "Course" as const,
										id: courseId,
									} as const)
							),
							"Course",
					  ]
					: ["Course"],
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
			providesTags: (result) =>
				result
					? [
							...result.courses.map(
								({ courseId }) =>
									({
										type: "Course" as const,
										id: courseId,
									} as const)
							),
							"Course",
					  ]
					: ["Course"],
		}),
		getTeacherCourses: builder.query<
			CourseResponse<Course>,
			PaginationRequest
		>({
			query: ({ page = 1, pageSize = 10 }) => ({
				url: "courses/findMyCourses",
				params: { page, pageSize },
			}),
			providesTags: (result) =>
				result
					? [
							...result.courses.map(
								({ courseId }) =>
									({
										type: "Course" as const,
										id: courseId,
									} as const)
							),
							"Course",
					  ]
					: ["Course"],
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
			providesTags: (arg: any) => [
				{
					type: "Course" as const,
					id: arg.courseId as number,
				},
				"Course",
			],
		}),
		editCourse: builder.mutation<void, EditCourseRequest>({
			query: ({ courseId, courseName, description }) => ({
				url: `courses/edit`,
				method: "POST",
				body: { courseId, courseName, description },
			}),
			invalidatesTags: (arg: any) => [
				{
					type: "Course" as const,
					id: arg.courseId as number,
				},
				"Course",
			],
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
