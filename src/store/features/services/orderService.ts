import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/store/store';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders(headers: Headers, { getState }): void {
            const token = (getState() as RootState).auth.token;
            headers.set('Authorization', `Bearer ${token}`);
        },
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
            }),
            invalidatesTags: ['Order'],
        }),
        getOrders: builder.query({
            query: () => '/orders',
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        getOrdersSelf: builder.query({
            query: () => '/orders/self',
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        getOrdersZsu: builder.query({
            query: () => '/orders/zsu',
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        getOrdersGrowth: builder.query({
            query: () => '/orders/growth',
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        getOrderById: builder.query({
            query: (id): string => `/orders/growth/${id}`,
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        getOrdersSelfAllAdmin: builder.query({
            query: () => '/orders/self/all',
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        getOrdersZsuAllAdmin: builder.query({
            query: () => '/orders/zsu/all',
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        getOrdersGrowthAllAdmin: builder.query({
            query: () => '/orders/growth/all',
            keepUnusedDataFor: 0,
            providesTags: ['Order'],
        }),
        changeOrderSendStatus: builder.mutation({
            query: ({ statusData }) => ({
                url: '/orders/update-status',
                method: 'PATCH',
                body: statusData,
            }),
            invalidatesTags: ['Order'],
        }),
        getOrderStatus: builder.query({
            query: (numberOrder) => `/orders/${numberOrder}`,
            providesTags: ['Order'],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrdersSelfQuery,
    useGetOrdersZsuQuery,
    useGetOrdersGrowthQuery,
    useGetOrderByIdQuery,
    useGetOrdersGrowthAllAdminQuery,
    useGetOrdersSelfAllAdminQuery,
    useGetOrdersZsuAllAdminQuery,
    useChangeOrderSendStatusMutation,
    useGetOrderStatusQuery,
} = orderApi;
