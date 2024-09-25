import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {RootState} from "@/store/store";
import { clearToken } from '../authSlice/authSlice';
import { clearCartProduct } from '../cartSlice/cartSlice';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,

        prepareHeaders(headers: Headers, {getState}): void {
            const token =( getState() as RootState).auth.token;
            headers.set('Authorization', `Bearer ${token}`);
        },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (option): FetchArgs => ({
                url: '/user/register',
                method: 'POST',
                body: option
            }),
            invalidatesTags: ['Auth']
        }),
        login: builder.mutation({
            query: (option): FetchArgs => ({
                url: 'auth/login',
                method: 'POST',
                body: option
            }),
            invalidatesTags: ['Auth']
        }),
        logout: builder.mutation({
            queryFn: async (_, { dispatch }) => {                
                dispatch(clearToken());
                dispatch(clearCartProduct());

                return { data: null };
            },
            invalidatesTags: ['Auth']
        }),
        profile: builder.query({
            query: () =>
                `/auth/profile`,
            providesTags: ['Auth'],
        }),
        updateProfile: builder.mutation({
            query: (option): FetchArgs => ({
                url: `/user/${option.id}`,
                method: 'PATCH',
                body: option.user
            }),
            invalidatesTags: ['Auth']
        }),
        deleteProfile: builder.mutation({
            query: (id): FetchArgs => ({
                url: `/user/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Auth']
        }),
        getUserById: builder.query({
            query: (id): FetchArgs => ({
                url: `/user/profile/${id}`,
            }),
            providesTags: ['Auth'],
        }),
        changePassword: builder.mutation({
            query: (option): FetchArgs => ({
                url: `/user/password/${option.id}`,
                method: 'PATCH',
                body: option.body
            }),
            invalidatesTags: ['Auth']
        }),
        getAllUsers: builder.query({
            query: (): FetchArgs => ({
                url: '/user',
            }),
            providesTags: ['Auth'],
        }),
        getAllUsersPagination: builder.query({
            query: (options) =>
                `/user/?order=${options.order}&page=${options.page}&take=${options.take}`,
            providesTags: ['Auth'],
        }),
    }),
});


export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useProfileQuery,
    useUpdateProfileMutation,
    useDeleteProfileMutation,
    useGetUserByIdQuery,
    useChangePasswordMutation,
    useGetAllUsersQuery,
    useGetAllUsersPaginationQuery,
} = authApi;