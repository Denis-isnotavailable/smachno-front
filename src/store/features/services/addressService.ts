import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "@/store/store";

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,

        prepareHeaders(headers: Headers, {getState}): void {
            const token =( getState() as RootState).auth.token;
            headers.set('Authorization', `Bearer ${token}`);
        },
    }),
    tagTypes: ['Address'],
    endpoints: (builder) => ({       
        getAddresses: builder.query({
            query: () =>
                '/address',
            keepUnusedDataFor: 0,
            providesTags: ['Address'],
        }),
        getAddressById: builder.query({
            query: (id):string =>
                `/address/${id}`,
            providesTags: ['Address'],
        }),
        createAddress: builder.mutation({
            query: (option): FetchArgs => ({
                url: '/address',
                method: 'POST',
                body: option.option
            }),
            invalidatesTags: ['Address']
        }),
        updateAddress: builder.mutation({
            query: (option): FetchArgs => ({
                url: `/address/${option.id}`,
                method: 'PATCH',
                body: option.option
            }),
            invalidatesTags: ['Address']
        }),
        deleteAddress: builder.mutation({
            query: (id): FetchArgs => ({
                url: `/address/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Address']
        }),
    }),
});


export const {
    useGetAddressesQuery,
    useCreateAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useGetAddressByIdQuery
} = addressApi;