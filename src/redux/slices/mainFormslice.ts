import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type TFirstStepSliceState = {
  phone: string;
  email: string;
  steps: string[];
};

const initialState: TFirstStepSliceState = {
  phone: "9120154853",
  email: "vlrik@mail.ru",
  steps: ["1", "2", "3"],
};

const mainFormslice = createSlice({
  name: "firstStepSlice",
  initialState,
  reducers: {
    changePhone: (state, action) => {
      state.phone = action.payload;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export default mainFormslice.reducer;

export const { changePhone, changeEmail } = mainFormslice.actions;
export const mainForm = (state: RootState) => state.mainFormslice;
