import { apiSlice } from "../../app/api/apiSlice";
import { type Course } from "../courses/courseApiSlice";

export enum TabContentType {
	TEXT = "TEXT",
	VIDEO = "VIDEO",
}
export interface Tab {
	tab_id: number;
	tabName: string;
	contentType: TabContentType;
	content: string;
	courseId: number;
	file: FormData;
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
		createTab: builder.mutation<void, FormData>({
			query: (formdata) => ({
				url: "tabs/create",
				method: "POST",
				body: formdata,
			}),
			invalidatesTags: (arg: any) => [
				{ type: "Tab", id: arg.formdata.get("courseId") },
			],
		}),
		// editTab: builder.mutation<void, FormData>({
		// 	query: (formdata) => ({
		// 		url: `tabs/edit/${tabId}`,
		// 		method: "POST",
		// 		body: { tabName, contentType, content, course },
		// 	}),
		// 	invalidatesTags: (arg: any) => [
		// 		{ type: "Tab", id: arg.course.courseId },
		// 	],
		// }),
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

export const {
	useGetTabByIdQuery,
	useCreateTabMutation,
	useCompleteTabMutation,
} = tabsApi;
