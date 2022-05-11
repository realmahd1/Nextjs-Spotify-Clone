import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface CurrentTrackIdState {
  value: string |object ;
  status: 'idle' | 'loading' | 'failed';
}

const currentTrackInitialState: CurrentTrackIdState = {
  value: '',
  status: 'idle',
};

export interface isPlayingState {
  value: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const isPlayingInitialState: isPlayingState = {
  value: false,
  status: 'idle',
};

export const currentTrackIdSlice = createSlice({
  name: 'song',
  initialState: currentTrackInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    currentTrackId: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const isPlayingTrackSlice = createSlice({
  name: 'isPlayTrack',
  initialState: isPlayingInitialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeTrackState: (state,action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { currentTrackId } = currentTrackIdSlice.actions;

export const { changeTrackState } = isPlayingTrackSlice.actions;

export const trackId = (state: RootState) => state.song.value;

export const playTrackState = (state: RootState) => state.isPlayTrack.value;

export default currentTrackIdSlice.reducer;
export const isPlayingTrackSliceReducer =  isPlayingTrackSlice.reducer;

