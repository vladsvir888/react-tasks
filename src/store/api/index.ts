import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants/config';
import type { Character, Data } from '../../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getCharacter: builder.query<Data<Character[]>, string | undefined>({
      query: (searchParams) => `/character/?${searchParams}`,
    }),
    getCharacterById: builder.query<Character, string>({
      query: (id) => `/character/${id}`,
    }),
  }),
});

export const { useGetCharacterQuery, useGetCharacterByIdQuery } = api;
