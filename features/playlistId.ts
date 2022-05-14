import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface PlaylistIdState {
  value: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: PlaylistIdState = {
  value: '',
  status: 'idle',
};

export const playlistIdSlice = createSlice({
  name: 'playlistId',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    selectId: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { selectId } = playlistIdSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectedId = (state: RootState) => state.playlistId.value;


export default playlistIdSlice.reducer;
