import { createSlice } from "@reduxjs/toolkit";
import { quizApi } from "./quizApiSlice";
import type { Question } from "./quizApiSlice";

export interface QuizState {
	questions: Question[];
	currentQuestion: Question | null;
}

const initialState: QuizState = {
	questions: [],
	currentQuestion: null,
};

export const quizSlice = createSlice({
	name: "quiz",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			quizApi.endpoints.getQuestionsByCourseId.matchFulfilled,
			(state, action) => {
				state.questions = action.payload;
			}
		);
	},
});

export const selectQuestions = (state: QuizState) => state.questions;

export default quizSlice.reducer;
