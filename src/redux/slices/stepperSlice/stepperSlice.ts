import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type TStepperSliceState = {
  steps: number[];
  currentStep: number;
};

const initialState: TStepperSliceState = {
  steps: [1, 2, 3],
  currentStep: 1,
};

const stepperSlice = createSlice({
  name: "stepperSlice",
  initialState,
  reducers: {
    changeCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export default stepperSlice.reducer;

export const { changeCurrentStep } = stepperSlice.actions;
export const stepper = (state: RootState) => state.stepperSlice;
