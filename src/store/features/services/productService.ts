import { RootState } from '@/store/store';
import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IProduct {
    id: string,
    name: string,
    description: string,
    productIcon: string,
    iconPublicId: string,
    productImage: string,
    imagePublicId: string,
    price: number,
    packaging: string,
    seasonStart: Date,
    seasonEnd: Date,
    weightMin: number,
    weightMax: number,
    unit: string,
    dimensionsHeight: number,
    dimensionsWidth: number,
    dimensionsLength: number,
    shipping: boolean,
    isReadyToOrderForGrowth: boolean,
    isNowInSell: boolean,
    createdAt: Date,
    updatedAt: Date
};

// interface IProductCreate {
//     name: string,
//     description: string,
//     productIcon: string,
//     productImage: string,
//     price: number,
//     packaging: string,
//     seasonStart: Date,
//     seasonEnd: Date,
//     weightMin: number,
//     weightMax: number,
//     unit: string,
//     dimensionsHeight: number,
//     dimensionsWidth: number,
//     dimensionsLength: number,
//     shipping: boolean
// };

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,

        prepareHeaders(headers: Headers, {getState}): void {
            const token = (getState() as RootState).auth.token;
            headers.set('Authorization', `Bearer ${token}`);
        },
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getAllProducts: builder.query<IProduct[], string>({
            query: () => '/products',
            providesTags: ['Product']
        }),
        createProduct: builder.mutation({
            query: ({formData}): FetchArgs => ({
                url: '/products',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: ({id, product}): FetchArgs => ({
                url: `/products/${id}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation<IProduct, string>({
            query: (id): FetchArgs => ({
                url: `/products/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Product']
        }),
    }),
});


export const {
    useGetAllProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi;