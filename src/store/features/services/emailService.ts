import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

export const emailApi = createApi({
    reducerPath: 'emailApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders(headers: Headers, { getState }): void {
            const token = (getState() as RootState).auth.token;
            headers.set('Authorization', `Bearer ${token}`);
        },
    }),
    tagTypes: ['Email'],
    endpoints: (builder) => ({
        sendEmail: builder.mutation({
            query: (order) => ({
                url: '/mailer/sendEmail',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Email'],
        }),
        sendNewPassword: builder.mutation({
            query: (email) => ({
                url: '/user/newPassword',
                method: 'POST',
                body: email,
            }),
            invalidatesTags: ['Email'],
        }),
    }),
});

export const { useSendEmailMutation, useSendNewPasswordMutation } = emailApi;
