import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TSecondStepSliceState } from "./types";

const initialState: TSecondStepSliceState = {
  advantages: [{ id: 0, text: "" }],
  checkbox: [1, 2, 3],
  radio: 3,
  isChecked: [false, false, false],
  radioValue: 0,
};

const secondStepSlice = createSlice({
  name: "secondStepSlice",
  initialState,
  reducers: {
    addAdvantage: (state, action) => {
      const { id, text } = action.payload;
      state.advantages.push({ id, text });
    },
    removeAdvantage: (state, action) => {
      const { index, number } = action.payload;
      state.advantages.splice(index, number);
    },
    changeAdvantageByIndex: (state, action) => {
      const { index, text } = action.payload;
      state.advantages[index].text = text;
    },
    checkboxCheck: (state, action) => {
      const { index } = action.payload;
      state.isChecked[index] = !state.isChecked[index];
    },
    changeRadioValue: (state, action) => {
      state.radioValue = action.payload;
    },
    cleanFieldsSecondStep: (state) => {
      state.advantages = [{ id: 0, text: "" }];
      state.isChecked = [false, false, false];
      state.radioValue = 0;
    },
  },
});

export default secondStepSlice.reducer;

export const {
  addAdvantage,
  removeAdvantage,
  changeAdvantageByIndex,
  checkboxCheck,
  changeRadioValue,
  cleanFieldsSecondStep,
} = secondStepSlice.actions;
export const secondStep = (state: RootState) => state.secondStepSlice;
