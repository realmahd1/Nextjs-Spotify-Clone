import { configureStore, } from '@reduxjs/toolkit';
import playlistIdReducer from '../features/playlistId';

export const store = configureStore({
  reducer: {
    playlistId: playlistIdReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

