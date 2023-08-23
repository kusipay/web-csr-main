import { configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalSlice';
import { GlobalState } from './slices/globalSlice';
export interface AppStore {
  global: GlobalState;
}

export default configureStore<AppStore>({
  reducer: {
    global: globalReducer
  }
});
