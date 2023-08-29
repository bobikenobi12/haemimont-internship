import { apiSlice } from "../../app/api/apiSlice";

export interface Question {
	question: string;
	rightAnswer: string;
	answers: {
		answer: string;
	}[];
	points: number;
	courseId: number;
}

export const quizApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getQuestionsByCourseId: builder.query<Question[], { courseId: number }>(
			{
				query: ({ courseId }) => `quiz/getQuestions/${courseId}`,
			}
		),
		createQuestion: builder.mutation<void, Question>({
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
	}),
});

export const { useGetQuestionsByCourseIdQuery, useCreateQuestionMutation } =
	quizApi;
