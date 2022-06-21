import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { playApi } from './playApi';
import { databraryApi } from './databraryApi';
import playReducer from './slices';

export const store = configureStore({
  reducer: {
    play: playReducer,
    [playApi.reducerPath]: playApi.reducer,
    [databraryApi.reducerPath]: databraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(playApi.middleware)
      .concat(databraryApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
