import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalSlice";
import { GlobalState } from "./slices/globalSlice";

import usersReducer from "./slices/userSlice";
import { UsersState } from "./slices/userSlice";
export interface AppStore {
  global: GlobalState;
  users: UsersState;
}

export const store = configureStore<AppStore>({
  reducer: {
    global: globalReducer,
    users: usersReducer
  }
});

export type StateStore = ReturnType<typeof store.getState>;
