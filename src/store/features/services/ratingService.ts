import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "@/store/store";

export const ratingApi = createApi({
    reducerPath: 'ratingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,

        prepareHeaders(headers: Headers, {getState}): void {
            const token =( getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        },
    }),
    tagTypes: ['Rating'],
    endpoints: (builder) => ({
        createRating: builder.mutation({
            query: (rating): FetchArgs => ({
                url: '/rating',
                method: 'POST',
                body: rating
            }),
            invalidatesTags: ['Rating']
        }),
    }),
});


export const {
    useCreateRatingMutation
} = ratingApi;