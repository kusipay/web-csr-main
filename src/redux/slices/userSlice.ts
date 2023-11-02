import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterValues } from "../../models/registerValues";

export interface UsersState {
  users: RegisterValues[];
}

const initialState: UsersState = {
  users: []
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<RegisterValues[]>) => {
      state.users = action.payload;
    }
  }
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
