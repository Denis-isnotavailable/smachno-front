import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface IReview {
    id: string,
    reviewUrl: string,
    reviewImage: string,
    reviewImagePublicId: string,
    text: string,
    createdAt: Date
};

interface IReviewCreate {
    reviewUrl: string,
    reviewImage: string,
    text: string,
};

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders(headers) {
            const token = 'exapple';
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        createReview: builder.mutation<IReview, IReviewCreate>({
            query: (review) => ({
                url: '/reviews',
                method: 'POST',
                body: review
            }),
            invalidatesTags: ['Review']
        }),
        paginationReview: builder.query({
            query: (options) =>
                `/reviews/?order=${options.order}&page=${options.page}&take=${options.take}`,
                providesTags: ['Review']
        }),
    }),
});

export const {
    usePaginationReviewQuery
} = reviewApi;