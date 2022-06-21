import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IVolume as Volume } from './interfaces';
import { Asset } from './types';

// Define a service using a base URL and expected endpoints
export const playApi = createApi({
  reducerPath: 'playApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/api/v1/' }),
  endpoints: (builder) => ({
    getVolumes: builder.query<string[], null>({
      query: () => `databrary/volumes`,
    }),
    getAssets: builder.query<Asset[], { volumeId: string }>({
      query: ({ volumeId }) => ({
        url: `databrary/assets`,
        params: { volume: volumeId },
      }),
    }),
    getVolumeInfo: builder.query<Volume, { volumeId: string }>({
      query: ({ volumeId }) => ({
        url: `databrary/volume`,
        params: { volume: volumeId },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetVolumesQuery, useGetAssetsQuery, useGetVolumeInfoQuery } =
  playApi;
