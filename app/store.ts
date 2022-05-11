import { configureStore, } from '@reduxjs/toolkit';
import playlistIdReducer from '../features/playlistId';
import currentTrackIdReducer, { isPlayingTrackSliceReducer } from '../features/song';

export const store = configureStore({
    reducer: {
        playlistId: playlistIdReducer,
        song: currentTrackIdReducer,
        isPlayTrack: isPlayingTrackSliceReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

