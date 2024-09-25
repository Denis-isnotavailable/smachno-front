import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from "@/store/store";

const URL = process.env.NEXT_PUBLIC_API_NP || 'https://api.novaposhta.ua/v2.0/json/';
// const API_KEY = process.env.NEXT_PUBLIC_API_NP_KEY || '63ddd82d73faa5d0f28b784817c02f6d';

export interface ICity {
    Description: string;
}

export interface IPostWherehouse {
    Description: string;
    ReceivingLimitationsOnDimensions: string;
}

export interface IPostWherehouses {
    postOffices: IPostWherehouse[];
    postBoxes: IPostWherehouse[];
}

interface IWherehouseResponse {
    TypeOfWarehouse: string;
    Description: string;
    ReceivingLimitationsOnDimensions: string;
}

interface IAreas {
    Description: string;
    [key: string]: string;
}

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: URL,

        // prepareHeaders(headers: Headers, {getState}): void {
        //     const token =( getState() as RootState).auth.token;
        //     headers.set('Authorization', `Bearer ${token}`);
        // },
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        // cities
        cities: builder.mutation({
            query: (idArea) => ({
                url: '',
                method: 'POST',
                body: {
                    modelName: 'Address',
                    calledMethod: 'getCities',
                    methodProperties: {
                        AreaRef: idArea,
                    },
                },
            }),
            transformResponse: (response: { data: ICity[] }) => {
                if (response.data) {
                    const cities = response.data.map(
                        ({ Description }: { Description: string }) => ({ Description })
                    );
                    return cities;
                } else {
                    return [];
                }
            },
            invalidatesTags: ['Post'],
        }),
        // post Wherehouses
        postWherehouses: builder.mutation({
            query: (city: string) => ({
                url: '',
                method: 'POST',
                body: {
                    modelName: 'Address',
                    calledMethod: 'getWarehouses',
                    methodProperties: {
                        CityName: city,
                    },
                },
            }),
            transformResponse: (response: { data: IWherehouseResponse[] }) => {
                const postOffices: IPostWherehouse[] = [];
                const postBoxes: IPostWherehouse[] = [];
                response.data.map(
                    ({
                        TypeOfWarehouse,
                        Description,
                        ReceivingLimitationsOnDimensions,
                    }: {
                        TypeOfWarehouse: string;
                        Description: string;
                        ReceivingLimitationsOnDimensions: string;
                    }) => {
                        if (TypeOfWarehouse === "f9316480-5f2d-425d-bc2c-ac7cd29decf0" ||
                            TypeOfWarehouse === "95dc212d-479c-4ffb-a8ab-8c1b9073d0bc") {                            
                            postBoxes.push({ Description, ReceivingLimitationsOnDimensions });
                        } else  {
                            postOffices.push({ Description, ReceivingLimitationsOnDimensions });
                        }
                    }
                );

                return { postOffices, postBoxes };
            },
            invalidatesTags: ['Post'],
        }),

        areas: builder.mutation({
            query: () => ({
                url: '',
                method: 'POST',
                body: {
                    modelName: 'Address',
                    calledMethod: 'getAreas',
                },
            }),
            transformResponse: (response: { data: IAreas[] }) => {
                if (response.data) {
                    const areas = response.data.map(({ Ref, Description }) => ({
                        id: Ref,
                        name: Description,
                    }));
                    return areas;
                } else {
                    return [];
                }
            },
            invalidatesTags: ['Post'],
        }),
    }),
});

export const { useCitiesMutation, usePostWherehousesMutation, useAreasMutation } = postApi;
