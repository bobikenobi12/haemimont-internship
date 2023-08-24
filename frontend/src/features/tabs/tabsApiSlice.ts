import { apiSlice } from "../../app/api/apiSlice";
import { type Course } from "../courses/courseApiSlice";

export enum TabContentType {
	TEXT = "TEXT",
	VIDEO = "VIDEO",
}

export interface CreateTabRequest {
	tabName: string;
	contentType: TabContentType;
	content: string;
	course: {
		courseId: number;
	};
}

export interface UpdateTabRequest extends CreateTabRequest {
	tabId: number;
}

export interface Tab extends CreateTabRequest {
	tab_id: number;
	course: Course;
	completed: boolean;
}

export const tabsApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTabById: builder.query<Tab, { tabId: number; courseId: number }>({
			query: ({ tabId, courseId }) => `tabs/get/${courseId}/${tabId}`,
			providesTags: (arg: any) => [
				{ type: "Tab", id: arg.tabId },
				{ type: "Tab", id: arg.courseId },
			],
		}),
		createTab: builder.mutation<void, CreateTabRequest>({
			query: ({ tabName, contentType, content, course }) => ({
				url: "tabs/create",
				method: "POST",
				body: { tabName, contentType, content, course },
			}),
			invalidatesTags: (arg: any) => [
				{ type: "Tab", id: arg.course.courseId },
			],
		}),
		editTab: builder.mutation<void, UpdateTabRequest>({
			query: ({ tabId, tabName, contentType, content, course }) => ({
				url: `tabs/edit/${tabId}`,
				method: "POST",
				body: { tabName, contentType, content, course },
			}),
			invalidatesTags: (arg: any) => [
				{ type: "Tab", id: arg.course.courseId },
			],
		}),
		completeTab: builder.mutation<
			void,
			{ tabId: number; courseId: number }
		>({
			query: ({ courseId, tabId }) => ({
				url: `tabs/complete/${courseId}/${tabId}`,
				method: "POST",
			}),
			invalidatesTags: (arg: any) => [
				{ type: "Tab", id: arg.courseId },
				{ type: "Tab", id: arg.tabId },
			],
		}),
	}),
});
