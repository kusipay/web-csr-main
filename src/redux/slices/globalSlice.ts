import { createSlice } from '@reduxjs/toolkit';

export interface GlobalState {
  mode: 'dark' | 'light';
}

const initialState: GlobalState = {
  mode: 'dark'
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    }
  }
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
