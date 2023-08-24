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
		createTab: builder.mutation<void, CreateTabRequest>({
			query: ({ tabName, contentType, content, course }) => ({
				url: "tabs/create",
				method: "POST",
				body: { tabName, contentType, content, course },
			}),
			invalidatesTags: ["Tab"],
		}),
		editTab: builder.mutation<void, UpdateTabRequest>({
			query: ({ tabId, tabName, contentType, content, course }) => ({
				url: `tabs/edit/${tabId}`,
				method: "POST",
				body: { tabName, contentType, content, course },
			}),
			invalidatesTags: ["Tab"],
		}),
		completeTab: builder.mutation<
			void,
			{ tabId: number; courseId: number }
		>({
			query: ({ courseId, tabId }) => ({
				url: `tabs/complete/${courseId}/${tabId}`,
				method: "POST",
			}),
			invalidatesTags: ["Tab"],
		}),
	}),
});
