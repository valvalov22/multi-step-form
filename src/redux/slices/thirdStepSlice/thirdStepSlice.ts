import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TThirdStepSliceState } from "./types";

const initialState: TThirdStepSliceState = {
  about: "",
  isOpen: false,
  rejectedIsOpen: false,
  loading: false,
};

const thirdStepSlice = createSlice({
  name: "thirdStepSlice",
  initialState,
  reducers: {
    changeTextareaValue: (state, action) => {
      state.about = action.payload;
    },
    cleanFieldsThirdStep: (state) => {
      state.about = "";
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setRejectedOpen: (state, action) => {
      state.rejectedIsOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export default thirdStepSlice.reducer;

export const {
  changeTextareaValue,
  cleanFieldsThirdStep,
  setOpen,
  setRejectedOpen,
  setLoading,
} = thirdStepSlice.actions;
export const thirdStep = (state: RootState) => state.thirdStepSlice;
