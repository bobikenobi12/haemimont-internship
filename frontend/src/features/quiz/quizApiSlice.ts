import { apiSlice } from "../../app/api/apiSlice";

export interface Question {
	question_id: number;
	question: string;
	rightAnswer: string;
	answers: {
		answer: string;
	}[];
	points: number;
	courseId: number;
}

export interface CompleteQuiz {
	courseId: number;
	answers: {
		questionId: number;
		rightAnswer: string;
	}[];
}
export const quizApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getQuestionsByCourseId: builder.query<Question[], { courseId: number }>(
			{
				query: ({ courseId }) => `quiz/getQuestions/${courseId}`,
			}
		),
		createQuestion: builder.mutation<void, Partial<Question>>({
			query: ({ courseId, answers, question, rightAnswer, points }) => ({
				url: "quiz/addQuestion/" + courseId,
				method: "POST",
				body: [
					{
						question: question,
						rightAnswer: rightAnswer,
						answers: answers,
						points: points,
					},
				],
			}),
			invalidatesTags: (_a, _b, arg) => [
				{ type: "Course", id: arg.courseId },
			],
		}),
		completeQuiz: builder.mutation<void, CompleteQuiz>({
			query: ({ courseId, answers }) => ({
				url: "quiz/complete/" + courseId,
				method: "POST",
				body: answers,
			}),
			invalidatesTags: (_a, _b, arg) => [
				{ type: "Course", id: arg.courseId },
			],
		}),
	}),
});

export const {
	useGetQuestionsByCourseIdQuery,
	useCreateQuestionMutation,
	useCompleteQuizMutation,
} = quizApi;
